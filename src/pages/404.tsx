import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  min-height: calc(100vh - 84px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageBox = styled.div`
  --content: '404';
  --color: rgba(0,180,42);
  --backgroud: rgba(0,180,42, .1);
`;

const Message = styled.div`
  text-align: center;
  font-family: 'JCYuanTi';
  font-size: 42px;
  position: relative;
  font-weight: 700;
  color: var(--color);
  span {
    position: relative;
  }
  &::before {
    content: var(--content);
    bottom: -18px;
    left: 50%;
    width: 400px;
    transform: translate(-200px);
    position: absolute;
    text-align: center;
    font-family: 'Rubik';
    font-size: 120px;
    font-weight: 700;
    color: var(--backgroud);
    margin: 0;
    padding:0;
  }
`;

const NotPage = () => (
  <Layout>
    <MessageBox>
      <Message>
        <span>
          走错路了
        </span>
      </Message>
    </MessageBox>
  </Layout>
);

export default NotPage;
