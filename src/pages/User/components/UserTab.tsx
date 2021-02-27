import { Tab } from '@app/components';
import { btnMixin } from '@app/styles/mixins';
import React, { memo } from 'react';
import { Link, resolvePath, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface IProps {}

const Wrapper = styled.div`
  padding: 0 24px;
  padding-top: 24px;
`;
const UserTab: React.FC<IProps> = memo(() => {
  return (
    <Wrapper>
      <Tab
        css={css`
          text-align: center;
        `}
      >
        <Tab.Item name="照片" to="."></Tab.Item>
        <Tab.Item name="精选" to="./choice"></Tab.Item>
        <Tab.Item name="喜欢" to="./like"></Tab.Item>
      </Tab>
    </Wrapper>
  );
});

export default UserTab;
