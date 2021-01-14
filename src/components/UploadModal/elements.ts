import styled from 'styled-components';

import { initButton } from '@app/styles/mixins';
import { Upload } from '..';

export const UploadHeader = styled(Upload)`
  ${initButton}
  width: 100%;
  padding: 24px;
  background-color: ${p => p.theme.colors.gray2};
  transition: 0.3s background-color ease;
  text-align: left;
  display: flex;
  align-items: center;
  svg {
    stroke: ${p => p.theme.colors.text};
  }
  &:hover {
    background-color: ${p => p.theme.colors.gray3};
  }
  &:active {
    background-color: ${p => p.theme.colors.gray4};
  }
`;

export const UploadTips = styled.span`
  color: ${p => p.theme.colors.text};
  margin-left: 24px;
`;
