import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { FieldInput, FieldTextarea, Modal } from '@app/components';
import Textarea from '@app/components/Input/Textarea';
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
  const [visible, close] = useSearchParamModal('setting');
  const { t } = useTranslation();
  const { key } = picture;
  const handleOk = () => {};
  return (
    <Modal maxWidth={560} centered visible={visible} onClose={close}>
      {/* <Modal.Background background={getPictureUrl(key, 'blur')} /> */}
      <Modal.Content>
        <Modal.Title>设置</Modal.Title>
        <Content>
          <Formik<IValues>
            initialValues={{
              ...pick(picture, ['title', 'bio', 'isPrivate']),
              tags: picture.tags.map(tag => tag.name),
            }}
            onSubmit={handleOk}
            // validationSchema={EditPictureSchema(t)}
          >
            {({ handleSubmit, isSubmitting }) => (
              <>
                <FieldInput
                  name="title"
                  label={t('label.picture_title') as string}
                />
                <FieldTextarea
                  name="bio"
                  label={t('label.picture_bio') as string}
                />
              </>
            )}
          </Formik>
        </Content>
      </Modal.Content>
    </Modal>
  );
};

export default SettingModal;
