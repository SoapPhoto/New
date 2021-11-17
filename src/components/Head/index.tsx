import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface IProps {
  title: string;
  description?: string;
}

const Head: React.FC<IProps> = ({ title, description }) => {
  const { t } = useTranslation();
  const name = `${title}- ${t ? t('title.name') : '肥皂'}`;
  return (
    <Helmet>
      <title>{name}</title>
      <meta
        key="meta-description"
        name="description"
        content={description}
      />
      <meta
        key="name"
        itemProp="name"
        content={name}
      />
      <meta
        key="description"
        itemProp="description"
        content={description}
      />
    </Helmet>
  );
};

export default Head;
