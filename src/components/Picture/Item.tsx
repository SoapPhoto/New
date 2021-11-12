import React, { CSSProperties, memo } from 'react';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { Link } from 'react-router-dom';
import PictureImage from './Image';
import {
  A,
  HandleBox,
  InfoBox,
  ItemBox,
  ItemWrapper,
  UserBox,
  UserName,
} from './elements';
import Avatar from '../Avatar';
import UserPopover from '../UserPopover';
import { EmojiText } from '..';

export interface IPictureItemProps {
  picture: PictureEntity;
  style?: CSSProperties;
}

const PictureItem: React.FC<IPictureItemProps> = ({ style, picture }) => (
  <ItemWrapper style={style} color={picture.color}>
    <A to={`/picture/${picture.id}`} />
    <ItemBox>
      <PictureImage
        blurhash={picture.blurhash}
        imgkey={picture.key}
      />
    </ItemBox>
    <InfoBox>
      <UserBox>
        <UserPopover username={picture.user.username}>
          <Link
            to={`/user/${picture.user.username}`}
            state={{
              picture: '222',
            }}
          >
            <Avatar
                  // badge={detail.user.badge}
              src={picture.user.avatar}
              size={32}
            />
          </Link>
        </UserPopover>
        <UserName to={`/user/${picture.user.username}`}>
          <EmojiText text={picture.user.fullName} />
        </UserName>
      </UserBox>
      <HandleBox />
    </InfoBox>
  </ItemWrapper>
);
export default memo(PictureItem);
