import Button from '@app/components/Button';
import { rem } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-gap: ${rem('24px')};
`;

export const ItemBox = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: ${rem('16px')};
`;

export const UserName = styled.p`
  font-weight: 400;
  color: ${(({ theme }) => theme.colors.text)};
  font-size: 15px;
`;

export const UserLabel = styled.span`
  display: inline-block;
  font-size: 12px;
  color: #fff;
  color: ${(({ theme }) => theme.colors.green)};
  margin-left: 6px;
  border-radius: 4px;
  padding: 1px 4px;
`;

export const MainBox = styled.div`
  display: grid;
  grid-row-gap: 6px;
`;

export const ContentBox = styled.div`
  font-size: 15px;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${(({ theme }) => theme.colors.secondary)};
`;

export const ReplyLabel = styled.span`
  color: ${(({ theme }) => theme.colors.secondary)};
  display: inline-block;
  margin-left: 6px;
`;

export const ContentItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

export const ConfirmText = styled.button`
  display: inline-block;
  border: none;
  background: none;
  outline: none;
  color: inherit;
  cursor: pointer;
  font-size: 14px;
`;

export const ChildComment = styled.div`
  position: relative;
  /* background-color: #f7f8fa; */
  /* padding: 14px 12px; */
  border-radius: 2px;
  margin-top: 12px;
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    left: -24px;
    top: 0px;
    background-color: ${(({ theme }) => theme.colors.gray1)};
  }
`;

export const Dot = styled.span`
  color: ${(({ theme }) => theme.colors.secondary)};
  font-family: monospace;
  margin: 0 4px;
`;

export const MoreChildComment = styled.div`
  text-align: center;
`;

export const MoreChildCommentBtn = styled(Button)`
  width: auto;
`;
