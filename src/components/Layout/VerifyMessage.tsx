import { useAccount } from '@app/stores/hooks';
import { observer } from 'mobx-react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import IconButton from '../Button/IconButton';
import { X } from '../Icons';

const Container = styled.div`
  overflow: hidden;
  /* position: fixed; */
  /* top: 0; */
  /* z-index: 101; */
  width: 100%;
  background: #000;
  color: #fff;
  height: 35px;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
`;

const Again = styled.button`
  margin: 0;
  padding: 0;
  outline: 0;
  border: none;
  background: none;
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
`;

const Close = styled(IconButton)`
  position: absolute;
  right: 12px;
  top: 5px;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VerifyMessage = observer(() => {
  const [verifyMessage, setVerifyMessage] = useState(true);
  const { userInfo } = useAccount();
  const unVerified = useMemo(() => userInfo?.status === 'UNVERIFIED', [
    userInfo?.status,
  ]);
  const reset = () => {};
  if (!unVerified || (!unVerified && !verifyMessage)) return null;
  return (
    <Container>
      <span>邮箱未激活，请检查您的电子邮箱，激活邮箱。</span>
      <Again onClick={reset}>重新发送激活邮件</Again>
      <Close onClick={() => setVerifyMessage(false)}>
        <X size={13} />
      </Close>
    </Container>
  );
});

export default VerifyMessage;
