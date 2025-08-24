import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import { Blurhash, EmojiText, Popover } from '@app/components'
import Comment from '@app/components/Comment'
import Head from '@app/components/Head'

import { Hash, Lock, Ordinary } from '@app/components/Icons'
import NotPage from '@app/pages/404'
import { useAccount } from '@app/stores/hooks'
import useQueryPicture from '@app/utils/hooks/useQueryPicture'
import { observer } from 'mobx-react'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Link, useParams } from 'react-router-dom'
import { css } from 'styled-components'
import {
  Bio,
  Content,
  Tag,
  TagBox,
  Title,
  ViewContent,
  Wrapper,
} from '../elements'
import PictureSkeleton from '../Skeleton'
import CollectionModal from './CollectionModal'
import ExifModal from './ExifModal'
import HeaderUserInfo from './HeaderUserInfo'
import PictureCenter from './PictureCenter'
import PictureInfo from './PictureInfo'
import SettingModal from './SettingModal'

const PictureContent = observer(() => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { userInfo } = useAccount()
  const [{ loading, data, error }, cacheData] = useQueryPicture<{ picture: PictureEntity }>(Number(id))
  const isMe = useMemo(() => data?.picture.user.id === userInfo?.id, [data?.picture.user.id, userInfo?.id])
  if (error?.message) {
    if (error.message === 'Not Found') {
      return <NotPage title="Opoooos...!" />
    }
  }
  if ((loading && (!data && !cacheData)) || (!data && !cacheData))
    return <PictureSkeleton />
  let picture: PictureEntity
  if (data) {
    picture = data.picture
  }
  else {
    picture = cacheData!
  }
  return (
    <Wrapper>
      <Head title={`${picture.title} (@${picture.user?.name ?? ''})`} />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.05)',
        }}
      >

        <Blurhash
          hash={picture.blurhash!}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <ViewContent>
        <div>
          <PictureCenter picture={picture} />
        </div>
      </ViewContent>
    </Wrapper>
  )
})

export default PictureContent
