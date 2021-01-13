import { animated } from 'react-spring';
import styled from 'styled-components';
import { ToastType } from './Toast';

const style: Record<ToastType, string> = {
  success: '#007aff',
  error: '#ff4d4f',
  warning: '#f5a623',
  base: '#fff',
};

const styleColor: Record<ToastType, string> = {
  success: '#fff',
  error: '#fff',
  warning: '#fff',
  base: '#000',
};

export const Container = styled.div`
  position: fixed;
  display: block;
  max-width: 468px;
  bottom: 10px;
  bottom: 20px;
  right: 20px;
  z-index: 5000;
  transition: all 0.4s ease;
`;

export const ToastBox = styled(animated.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 468px;
`;

export const Toast = styled(animated.div)<{ type: ToastType }>`
  overflow: hidden;
  word-break: break-all;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  color: ${p => styleColor[p.type]};
  background-color: ${p => style[p.type]};
  min-height: 72px;
  /* transition: all 0.25s ease; */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
`;

export const Content = styled(animated.div)`
  text-align: left;
  display: flex;
  flex: 1;
`;

export const ActionBox = styled.div`
  min-width: max-content;
`;
