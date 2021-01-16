import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { FieldInput, FieldSwitch, FieldTextarea, Modal } from '@app/components';
import { useSearchParamModal } from '@app/utils/hooks';
import { getPictureUrl } from '@app/utils/image';
import { Formik } from 'formik';
import { pick } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Content } from '../../elements';

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
  const { key } = picture;
  const [visible, close] = useSearchParamModal('setting');
  const { t } = useTranslation();
  const handleOk = () => {};
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
              </>
            )}
          </Formik>
        </Content>
      </Modal.Content>
    </Modal>
  );
};

export default SettingModal;
