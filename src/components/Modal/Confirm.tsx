import React from 'react';
import styled from 'styled-components';
import { AlertCircle, Trash2 } from 'react-feather';
import { IModalProps } from '.';
import { Button, Modal } from '..';

interface IConfirmProps extends Pick<IModalProps, 'visible' | 'onClose'> {}

const Content = styled.div`
  text-align: center;
  padding: 24px 12px;
`;

const Icon = styled.div`
  padding: 24px 0;
  padding-top: 0px;
`;

const Title = styled.h3`
  margin-bottom: 12px;
`;

const Handle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Confirm: React.FC<IConfirmProps> = ({ visible, onClose }) => {
  return (
    <Modal
      maxWidth="320px"
      autoMobile={false}
      centered
      visible={visible}
      onClose={onClose}
    >
      <Content>
        <Icon>
          <AlertCircle color="rgba(255, 130, 0, .8)" size={48} />
        </Icon>
        <Title>是否要删除</Title>
        <Handle>
          <div style={{ marginRight: 12 }}>
            <Button type="text">取消</Button>
          </div>
          <div>
            <Button icon={<Trash2 size={16} />} danger>
              确定
            </Button>
          </div>
        </Handle>
      </Content>
    </Modal>
  );
};

export default Confirm;
