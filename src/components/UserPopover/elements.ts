import React from 'react';
import styled from 'styled-components';

import { Image } from '..';

export const Wrapper = styled.div`
  width: 340px;
  padding: 20px 24px;
  padding-bottom: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const UserBox = styled.div`
  flex: 1;
  margin-left: 16px;
`;

export const UserNameBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
`;

export const UserName = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 2px;
  color: ${p => p.theme.colors.text};
  text-decoration-color: ${p => p.theme.colors.primary};
`;

export const Bio = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-decoration-color: ${p => p.theme.colors.gray4};
`;

export const PicturePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 6px;
`;

export const PreviewBox = styled.div`
  position: relative;
  padding-bottom: 75%;
  border-radius: 2px;
  overflow: hidden;
`;

export const Img = styled(Image)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: 'object-fit:cover';
  object-fit: cover;
`;

export const UserInfoWrapper = styled.div`
  border-top: 1px solid ${p => p.theme.colors.gray4};
  padding: 14px 10px;
  margin-top: 16px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const InfoItem = styled.div`
  padding: 0 12px;
`;

export const InfoItemCount = styled.span`
  margin-right: 8px;
  font-weight: 600;
  font-family: Rubik;
`;

export const InfoItemLabel = styled.span`
  color: ${p => p.theme.colors.secondary};
  font-size: 12px;
  font-weight: 400;
`;
