import React, { CSSProperties } from 'react';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import PictureImage from './Image';
import {
  A,
  HandleBox,
  InfoBox,
  ItemBox,
  ItemWrapper,
  Shadow,
  UserBox,
  UserName,
} from './elements';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import UserPopover from '../UserPopover';

interface IPictureItemProps {
  picture: PictureEntity;
  style: CSSProperties;
}

const PictureItem: React.FC<IPictureItemProps> = ({ style, picture }) => {
  return (
    <ItemWrapper style={style} color={picture.color}>
      <A to={`/picture/${picture.id}`} />
      <ItemBox>
        <PictureImage blurhash={picture.blurhash} imgkey={picture.key} />
      </ItemBox>
      <InfoBox>
        <UserBox>
          <UserPopover username={picture.user.username}>
            <Link to={`/@${picture.user.username}`}>
              <Avatar
                // badge={detail.user.badge}
                src={picture.user.avatar}
                size={32}
              />
            </Link>
          </UserPopover>
          <UserName to={`/@${picture.user.username}`}>
            <span>{picture.user.fullName}</span>
            {/* <EmojiText text={picture.user.fullName} /> */}
          </UserName>
        </UserBox>
        <HandleBox />
      </InfoBox>
    </ItemWrapper>
  );
};

export default PictureItem;
