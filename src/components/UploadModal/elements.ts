import styled from 'styled-components';

import { initButton } from '@app/styles/mixins';
import { Upload } from '..';
import { darken, rgba } from 'polished';

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

export const ThumbnailHover = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: url(filters.svg#filter) blur(6px) saturate(150%);
  background-color: ${p => rgba(p.color || '#000', 0.6)};
  transition: 0.3s opacity ease;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    stroke: ${p => rgba(darken(0.5, p.color || p.theme.colors.text), 0.6)};
  }
`;
export const Thumbnail = styled.button`
  ${initButton}
  position: relative;
  width: 120px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${ThumbnailHover} {
      opacity: 1;
    }
  }
`;

export const UploadImageHeader = styled.div`
  width: 100%;
  padding: 24px;
  text-align: left;
  display: flex;
  align-items: center;
`;

export const UploadTips = styled.span`
  color: ${p => p.theme.colors.text};
  margin-left: 24px;
`;
