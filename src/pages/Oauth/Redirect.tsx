import { AlertCircle, CheckCircle, XCircle } from '@app/components/Icons';
import qs from 'qs';
import React, { useMemo } from 'react';
import { useSearchParams, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: calc(100vh - 84px);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 120px;
`;

const Error = styled.div`
  --color: rgba(245,63,63);
  --backgroud: rgba(245,63,63, .1);
  --content: 'Error';
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Success = styled.div`
  --color: rgba(0,180,42);
  --backgroud: rgba(0,180,42, .1);
  --content: 'Success';
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Icon = styled.div`
  svg {
    color: var(--color);
    position: relative;
    z-index: 1;
    stroke-width: 4;
    width: 60px;
    height: 60px;
    margin-bottom: 60px;
  }
`;

const MessageBox = styled.div``;

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
    font-family: 'JCYuanTi';
    font-size: 90px;
    font-weight: 700;
    color: var(--backgroud);
    margin: 0;
    padding:0;
  }
`;

const OauthRedirect = () => {
  const location = useLocation();
  const params = useParams();
  const query = useMemo(() => qs.parse(location.search, { ignoreQueryPrefix: true }), [location.search]);
  const isSuccess = useMemo(() => !!query.code, [query.code]);
  return (
    <Wrapper>
      {
        isSuccess ? (
          <Success>
            <Icon>
              <CheckCircle />
            </Icon>
            <MessageBox>
              <Message>
                <span>
                  跳转中，请稍等
                </span>
              </Message>
            </MessageBox>
          </Success>
        ) : (
          <Error>
            <Icon>
              <AlertCircle />
            </Icon>
            <MessageBox>
              <Message>
                <span>
                  {query.message || '失败了，请重试'}
                </span>
              </Message>
            </MessageBox>
          </Error>
        )
      }
    </Wrapper>
  );
};

export default OauthRedirect;
