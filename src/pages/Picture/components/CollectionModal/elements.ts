import Image from '@app/components/Image';
import { Check, Minus } from '@app/components/Icons';
import { rgba } from 'polished';
import styled, { css } from 'styled-components/macro';

export const CollectionBox = styled.div`
  padding: 24px;
  padding-top: 0;
  display: grid;
  grid-gap: 14px;
`;

export const CollectionItemBox = styled.button`
  cursor: pointer;
  outline: none;
  display: block;
  width: 100%;
  height: 80px;
  border-radius: 5px;
  background-color: ${(p) => p.theme.colors.gray1};
  overflow: hidden;
  border: none;
  padding: 0;
  background-color: transparent;
  position: relative;
  text-align: inherit;
  transition: transform 0.1s;
`;

export const CheckIcon = styled(Check)`
  transition: 0.1s opacity ease;
`;
export const MinusIcon = styled(Minus)`
  transition: 0.1s opacity ease;
`;

export const ItemInfoBox = styled.div<{
  isCollected: number;
  isPreview: number;
}>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.15s ease-in-out;
  padding: 17px 20px;
  border-radius: 5px;
  backdrop-filter: saturate(180%) blur(5px);
  color: ${(_) => _.theme.widget.collection.addPicture.color};
  & ${CheckIcon} {
    opacity: 0;
  }
  & ${MinusIcon} {
    opacity: 0;
  }
  &:hover {
    & ${CheckIcon} {
      opacity: 1;
    }
  }
  background: ${(_) => rgba(
    _.theme.widget.collection.addPicture.background,
    _.isPreview ? 0.2 : 1,
  )};
  ${(_) => (_.isCollected
    ? css`
          border: 2px solid ${_.theme.colors.green};
          background: linear-gradient(
            45deg,
            ${rgba(_.theme.widget.collection.addPicture.background, 0.2)},
            ${_.theme.colors.green}
          );
          & ${CheckIcon} {
            opacity: 1;
          }
          &:hover {
            & ${MinusIcon} {
              opacity: 1;
            }
            & ${CheckIcon} {
              opacity: 0;
            }
          }
        `
    : css``)}
`;

export const ItemInfoTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
`;

export const ItemInfoCount = styled.p`
  font-size: 13px;
`;

export const CollectionItemCover = styled(Image)`
  font-family: 'object-fit:cover';
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const ItemHandleIcon = styled.div`
  position: relative;
  & svg:first-child {
    position: absolute;
  }
`;
