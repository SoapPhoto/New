import type { LocationEntity } from '@app/common/types/modules/location/location.entity'
import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import type { BaiduClassify } from '@app/common/types/shared/baidu/interface/baidu.interface'
import type { FormikProps } from 'formik'

import { useApolloClient } from '@apollo/client'
import { UploadType } from '@app/common/enum/upload'
import Button from '@app/components/Button'
import Modal from '@app/components/Modal'
import { Picture } from '@app/graphql/query'
import { uploadOSS } from '@app/services/file'
import { addPicture } from '@app/services/picture'
import { useAccount } from '@app/stores/hooks'
import {
  useImageInfo,
  useNewPictureCacheWrite,
  useSearchParamModal,
  useTapButton,
} from '@app/utils/hooks'
import { Form, Formik } from 'formik'
import { observer } from 'mobx-react'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { css } from 'styled-components'
import * as Yup from 'yup'
import {
  FieldInput,
  FieldSwitch,
  FieldTag,
  FieldTextarea,
  Loading,
} from '..'
import EditExifModal from '../EditExifModal'
import FieldLocation from '../Formik/FieldLocation'
import { Edit, Image, Trash2 } from '../Icons'
import LocationModal from '../LocationModal'
import { TagItem } from '../Tag/elements'
import {
  DeleteBtn,
  DeleteImageBtnBox,
  Thumbnail,
  ThumbnailHover,
  UploadBox,
  UploadHeader,
  UploadImageHeader,
  UploadTips,
} from './elements'

// 常量定义
const OSS_SDK_URL = 'http://gosspublic.alicdn.com/aliyun-oss-sdk-6.23.0.min.js'
const ANIMATION_SCALE = { pressed: 0.95, hover: 1.03 }

// 类型定义
export interface IValues {
  isLocation: boolean
  isPrivate: boolean
  title: string
  bio: string
  location?: LocationEntity
  tags: string[]
}

interface DeleteImageBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onDelete: () => void
}

// 删除图片按钮组件
const DeleteImageBtn: React.FC<DeleteImageBtnProps> = React.memo(({
  style,
  onClick,
  onDelete,
  ...props
}) => {
  const { t } = useTranslation()
  const [spring, bind] = useTapButton(ANIMATION_SCALE.hover, ANIMATION_SCALE.pressed)

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    onDelete()
  }, [onClick, onDelete])

  return (
    <DeleteBtn
      {...props}
      {...bind()}
      style={{ ...style, ...spring }}
      onClick={handleClick}
    >
      <Trash2 size={18} style={{ marginRight: 4 }} />
      {t('picture.upload.deleteImage')}
    </DeleteBtn>
  )
})

// 系统推荐标签组件
interface SystemTagsProps {
  classify: BaiduClassify[]
  onTagSelect: (keyword: string) => void
}

const SystemTags: React.FC<SystemTagsProps> = React.memo(({ classify, onTagSelect }) => {
  const tagStyles = useMemo(() => css`
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  `, [])

  const tagContainerStyles = useMemo(() => css`
    display: flex;
    flex-wrap: wrap;
    grid-gap: 12px;
  `, [])

  if (!classify.length)
    return null

  return (
    <div css={tagStyles}>
      <div css={css`margin-bottom: 12px;`}>系统推荐标签：</div>
      <div css={tagContainerStyles}>
        {classify.map(c => (
          <TagItem
            key={c.keyword}
            css={css`cursor: pointer;`}
            onClick={() => onTagSelect(c.keyword)}
          >
            {c.keyword}
          </TagItem>
        ))}
      </div>
    </div>
  )
})

// OSS 加载器组件
const OSSLoader: React.FC = React.memo(() => (
  <div style={{
    display: 'flex',
    minHeight: '140px',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }}
  >
    <Loading />
    <div style={{ fontSize: 12, marginTop: 12 }}>
      加载中，请稍等！
    </div>
  </div>
))

// 图片上传头部组件
interface ImageUploadHeaderProps {
  thumbnail?: string
  info?: any
  onEditExif: () => void
  onDeleteImage: () => void
  onFileChange: (files: Maybe<FileList>) => void
}

const ImageUploadHeader: React.FC<ImageUploadHeaderProps> = React.memo(({
  thumbnail,
  info,
  onEditExif,
  onDeleteImage,
  onFileChange,
}) => {
  const { t } = useTranslation()

  if (!thumbnail) {
    return (
      <UploadHeader onFileChange={onFileChange}>
        <Image size={32} />
        <UploadTips>{t('picture.upload.selectImg')}</UploadTips>
      </UploadHeader>
    )
  }

  return (
    <UploadImageHeader>
      <Thumbnail onClick={onEditExif}>
        <img alt="" src={thumbnail} />
        <ThumbnailHover color={info?.color}>
          <Edit />
        </ThumbnailHover>
      </Thumbnail>
      <DeleteImageBtnBox>
        <DeleteImageBtn onDelete={onDeleteImage} />
      </DeleteImageBtnBox>
    </UploadImageHeader>
  )
})

// 主要的 UploadModal 组件
const UploadModal = observer(() => {
  const client = useApolloClient()
  const { t } = useTranslation()
  const { userInfo } = useAccount()
  const [writePictures] = useNewPictureCacheWrite()

  // 状态管理
  const [loading, setLoading] = useState(true)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [location, setLocation] = useState<LocationEntity>()

  // Modal 状态
  const [visible, close] = useSearchParamModal('upload')
  const [editExifVisible, closeEditExif, openEditExif] = useSearchParamModal('editExif', 'modal-child')
  const [editLocationVisible, closeEditLocation, openEditLocation] = useSearchParamModal('editLocation', 'modal-child')

  // Refs
  const imageRef = useRef<File>(null)
  const formikRef = useRef<FormikProps<IValues>>(null)

  // 图片信息 Hook
  const [info, thumbnail, setFile, clearImage, classify] = useImageInfo(imageRef)

  // 表单验证 Schema (使用 useMemo 优化)
  const validationSchema = useMemo(() =>
    Yup.object().shape({
      title: Yup.string().required(t('picture.upload.yup_title_required')),
    }), [t])

  // 初始表单值
  const initialValues: IValues = useMemo(() => ({
    title: '',
    isLocation: false,
    bio: '',
    isPrivate: false,
    location: undefined,
    tags: [],
  }), [])

  // 文件更改处理
  const handleFileChange = useCallback(async (files: Maybe<FileList>) => {
    if (files?.[0]) {
      setFile(files[0])
    }
  }, [setFile])

  // OSS SDK 加载
  const loadOSSSDK = useCallback(() => {
    if ((window as any).OSS) {
      setLoading(false)
      return
    }

    const head = document.getElementsByTagName('head')[0] || document.documentElement
    const script = document.createElement('script')

    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', OSS_SDK_URL)
    script.onload = () => {
      console.log('OSS 加载成功!')
      setLoading(false)
    }
    script.onerror = () => {
      console.error('OSS SDK 加载失败')
      toast.error('OSS SDK 加载失败，请刷新页面重试')
      setLoading(false)
    }

    head.appendChild(script)
  }, [])

  // 上传进度回调
  const onUploadProgress = useCallback((percent: number) => {
    // 如果需要显示进度，可以在这里处理
    console.log(`Upload progress: ${percent}%`)
  }, [])

  // 设置位置信息
  const onSetLocation = useCallback((poi: LocationEntity) => {
    setLocation(poi)
    formikRef.current?.setFieldValue('location', poi)
    closeEditLocation()
  }, [closeEditLocation])

  // 添加推荐标签
  const handleTagSelect = useCallback((keyword: string) => {
    const currentTags = formikRef.current?.values.tags || []
    const newTags = [...new Set([...currentTags, keyword])]
    formikRef.current?.setFieldValue('tags', newTags)
  }, [])

  // 表单提交处理
  const onSubmit = useCallback(async (values: IValues) => {
    if (!info || !imageRef.current) {
      toast.error(t('picture.upload.noImgWarn'))
      return
    }

    if (!userInfo?.id) {
      toast.error('用户信息不存在')
      return
    }

    setUploadLoading(true)

    try {
      // 上传到 OSS
      const key = await uploadOSS(
        imageRef.current,
        userInfo.id,
        UploadType.PICTURE,
        onUploadProgress,
      )

      if (!key) {
        throw new Error('Upload failed: no key returned')
      }

      // 添加图片记录
      const { data } = await addPicture({
        info: { ...info, classify },
        key,
        originalname: info.originalname,
        size: info.size,
        mimetype: info.mimetype,
        ...values,
        tags: values.tags.map(v => ({ name: v })),
      })

      // 如果不是私有图片，更新缓存
      if (data && !data.isPrivate) {
        const { data: picture } = await client.query<{ picture: PictureEntity }>({
          query: Picture,
          variables: { id: data.id },
        })
        writePictures(picture.picture)
      }

      toast.success(t('picture.upload.uploadSuccess'))
      close()
    }
    catch (err) {
      const errorMessage = err instanceof Error
        ? (t(err.message as any) as string || t('picture.upload.uploadError'))
        : t('picture.upload.uploadError')

      toast.error(errorMessage)
      console.error('Upload error:', err)
    }
    finally {
      setUploadLoading(false)
    }
  }, [classify, client, close, info, onUploadProgress, t, userInfo, writePictures])

  // Modal 关闭后清理
  const afterClose = useCallback(() => {
    clearImage()
    setUploadLoading(false)
    setLocation(undefined)
  }, [clearImage])

  // 副作用处理
  useEffect(() => {
    if (visible) {
      loadOSSSDK()
    }
  }, [visible, loadOSSSDK])

  useEffect(() => {
    if (visible && editLocationVisible && !thumbnail) {
      closeEditLocation(true)
    }
  }, [closeEditLocation, editLocationVisible, thumbnail, visible])

  useEffect(() => {
    if (visible && editExifVisible && !thumbnail) {
      closeEditExif(true)
    }
  }, [closeEditExif, editExifVisible, thumbnail, visible])

  return (
    <Modal
      afterClose={afterClose}
      centered
      destroyOnClose
      closable
      fullscreen
      maxWidth={600}
      visible={visible}
      onClose={close}
      maskClosable={false}
    >
      {thumbnail && <Modal.Background height={140} background={thumbnail} />}

      {loading ? (
        <OSSLoader />
      ) : (
        <Modal.Content>
          <ImageUploadHeader
            thumbnail={thumbnail}
            info={info}
            onEditExif={openEditExif}
            onDeleteImage={clearImage}
            onFileChange={handleFileChange}
          />

          <UploadBox>
            <Formik<IValues>
              innerRef={formikRef}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isValid }) => (
                <Form>
                  <FieldInput
                    required
                    name="title"
                    label={t('label.picture_title') as string}
                  />

                  <FieldTextarea
                    name="bio"
                    label={t('label.picture_bio') as string}
                  />

                  {classify && classify.length > 0 && (
                    <SystemTags
                      classify={classify}
                      onTagSelect={handleTagSelect}
                    />
                  )}

                  <FieldTag name="tags" />

                  <FieldLocation
                    label="地点"
                    bio="添加地点"
                    name="location"
                  />

                  <div style={{ height: '24px' }} />

                  <FieldSwitch
                    name="isPrivate"
                    label={t('label.private')}
                    bio={t('picture.label.privateBio')}
                  />

                  <div style={{ height: '36px' }} />

                  <Button
                    loading={uploadLoading}
                    htmlType="submit"
                    disabled={!(isValid && thumbnail)}
                  >
                    {t('picture.upload.uploadBtn')}
                  </Button>
                </Form>
              )}
            </Formik>
          </UploadBox>
        </Modal.Content>
      )}

      {thumbnail && (
        <EditExifModal
          initialValues={{
            make: info?.make,
            model: info?.model,
            ...info?.exif,
          }}
        />
      )}

      {thumbnail && <LocationModal onOk={onSetLocation} />}
    </Modal>
  )
})

export default UploadModal
