import { Tab } from '@app/components';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components/macro';

interface IProps {}

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 24px;
`;
const UserTab: React.FC<IProps> = memo(() => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Tab style={{ textAlign: 'center' }}>
        <Tab.Item name={t('user.tab.new')} to="." />
        <Tab.Item name={t('user.tab.choice')} to="./choice" />
        <Tab.Item name={t('user.tab.likes')} to="./like" />
      </Tab>
    </Wrapper>
  );
});

export default UserTab;
