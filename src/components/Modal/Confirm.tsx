import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { AlertCircle, Trash2 } from 'react-feather';
import Modal, { IModalProps } from '.';
import Button, { IButtonProps } from '../Button';

interface IConfirmProps extends Pick<IModalProps, 'visible' | 'onClose'> {
  icon?: React.ReactNode;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  confirmText?: string;
  cancelText?: string;
  confirmButtonProps?: IButtonProps;
  cancelButtonProps?: IButtonProps;
  title: string;
}

const Content = styled.div`
  text-align: center;
  padding: 24px 16px;
`;

const Icon = styled.div`
  padding: 24px 0;
  padding-top: 0px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const Handle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Confirm: React.FC<IConfirmProps> = ({
  visible,
  onClose,
  onConfirm,
  icon,
  title,
  cancelButtonProps,
  cancelText = '取消',
  confirmText = '确定',
  confirmButtonProps,
}) => (
  <Modal
    maxWidth="340px"
    autoMobile={false}
    centered
    visible={visible}
    onClose={onClose}
  >
    <Content>
      <Icon>
        {icon || (
        <AlertCircle color="rgba(255, 130, 0, .8)" size={48} />
        )}
      </Icon>
      <Title>{title}</Title>
      <Handle>
        <div style={{ marginRight: 12 }}>
          <Button type="text" {...cancelButtonProps} onClick={onClose}>
            {cancelText}
          </Button>
        </div>
        <div>
          <Button {...confirmButtonProps} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </Handle>
    </Content>
  </Modal>
);

export default Confirm;
