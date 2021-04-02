import { animated } from 'react-spring';
import styled, { css } from 'styled-components';

export const LabelBox = styled.div`
  position: relative;
  text-align: left;
  display: block;
`;
export const Label = styled.span`
  display: inline-block;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.61px;
  font-size: 14px;
`;

export const ErrorBox = styled.div`
  margin-top: 2px;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
`;
export const Error = styled(animated.div as any)`
  font-size: 12px;
  color: ${p => p.theme.colors.error};
`;

const OFFSET = 12;

export const ItemContent = styled(animated.div as any)<{ isclicked: number }>`
  z-index: 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &::before {
    content: '';
    z-index: -1;
    position: absolute;
    top: -${OFFSET}px;
    left: -${OFFSET}px;
    width: calc(100% + ${OFFSET * 2}px);
    height: calc(100% + ${OFFSET * 2}px);
    background: transparent;
    transform: scale(0.9);
    border-radius: 6px;
    transition: 0.2s all ease;
  }
  ${_ =>
    _.isclicked
      ? css`
          cursor: pointer;
          &:hover {
            &::before {
              transform: scale(1);
              background: ${p => p.theme.colors.gray3};
            }
          }
        `
      : ''}
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ItemLabel = styled.p`
  font-size: 14px;
  color: ${p => p.theme.colors.text};
  margin: 0;
`;
export const ItemBio = styled.p`
  font-size: 12px;
  color: ${p => p.theme.colors.secondary};
  margin-top: 4px;
`;
