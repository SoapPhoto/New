import { useMutation } from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import {
  Button,
  FieldInput,
  FieldSwitch,
  FieldTextarea,
  IconButton,
  Modal,
  Toast,
} from '@app/components';
import { DeletePicture } from '@app/graphql/mutations';
import { useSearchParamModal } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';
import { Formik } from 'formik';
import { pick } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Content } from '../../elements';
import { Footer } from './elements';

interface IProps {
  picture: PictureEntity;
}
interface IValues {
  title: string;
  bio: string;
  isPrivate: boolean;
  tags: string[];
}
const SettingModal: React.FC<IProps> = ({ picture }) => {
  const { colors } = useTheme();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const { key, id } = picture;
  const [visible, close] = useSearchParamModal('setting');
  const { t } = useTranslation();
  const [deleteItem, { loading }] = useMutation(DeletePicture);
  const handleOk = () => {};
  const deletePicture = useCallback(async () => {
    try {
      const data = await deleteItem({ variables: { id } });
      console.log(data);
    } catch (err) {
      Toast.error(err.message, 10000000, onDelete => (
        <button onClick={onDelete}>关闭</button>
      ));
    }
  }, [deleteItem, id]);
  return (
    <Modal maxWidth={560} centered visible={visible} onClose={() => close()}>
      <Modal.Background background={getPictureUrl(key, 'blur')} />
      <Modal.Content>
        <Modal.Title>编辑图片</Modal.Title>
        <Content>
          <Formik<IValues>
            initialValues={{
              ...pick(picture, ['title', 'bio', 'isPrivate']),
              tags: picture.tags.map(tag => tag.name),
            }}
            onSubmit={handleOk}
            // validationSchema={EditPictureSchema(t)}
          >
            {() => (
              <>
                <FieldInput
                  required
                  name="title"
                  label={t('label.picture_title') as string}
                />
                <FieldTextarea
                  name="bio"
                  label={t('label.picture_bio') as string}
                />
                <FieldSwitch
                  name="isPrivate"
                  label="私人"
                  bio="这个图片仅自己可见"
                />
                <div style={{ height: '12px' }} />
                <Footer>
                  <div>
                    <IconButton onClick={() => setConfirmVisible(true)}>
                      <Trash2 color={colors.error} />
                    </IconButton>
                  </div>
                  <div>
                    <Button htmlType="submit">保存</Button>
                  </div>
                </Footer>
              </>
            )}
          </Formik>
        </Content>
        <Modal.Confirm
          visible={confirmVisible}
          onClose={() => setConfirmVisible(false)}
          onConfirm={deletePicture}
          confirmText="删除"
          confirmButtonProps={{
            danger: true,
            icon: <Trash2 size={16} />,
            loading: loading,
          }}
          title="是否确认删除，删除之后不能恢复！"
        />
      </Modal.Content>
    </Modal>
  );
};

export default SettingModal;
