import { Tab } from '@app/components';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';

interface IProps {}

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 24px;
`;
const UserTab: React.FC<IProps> = memo(() => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Tab
        css={css`
          text-align: center;
        `}
      >
        <Tab.Item name={t('user.tab.new')} to="."></Tab.Item>
        <Tab.Item name={t('user.tab.choice')} to="./choice"></Tab.Item>
        <Tab.Item name={t('user.tab.likes')} to="./like"></Tab.Item>
      </Tab>
    </Wrapper>
  );
});

export default UserTab;
