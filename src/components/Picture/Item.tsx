import React, { CSSProperties, memo } from 'react';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTapButton } from '@app/utils/hooks';
import PictureImage from './Image';
import {
  A,
  ChoiceBox,
  HandleBox,
  InfoBox,
  ItemBox,
  ItemWrapper,
  UserBox,
  UserName,
} from './elements';
import Avatar from '../Avatar';
import UserPopover from '../UserPopover';
import { Blurhash, EmojiText, Popover } from '..';
import { Ordinary } from '../Icons';

export interface IPictureItemProps {
  picture: PictureEntity;
  style?: CSSProperties;
}

const PictureItem: React.FC<IPictureItemProps> = ({ style, picture }) => {
  const [spring, bind] = useTapButton();
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <ItemWrapper style={style} color={picture.color} isPrivate={picture.isPrivate ? 1 : 0}>
      {
        picture.badge?.findIndex((v) => v.name === 'choice') >= 0 && (
          <Popover
            openDelay={100}
            trigger="hover"
            placement="top"
            theme="dark"
            content={<span>{t('label.choice')}</span>}
          >
            <ChoiceBox
              style={{
                position: 'absolute',
                zIndex: 3,
              }}
            >
              <Ordinary size={28} />
            </ChoiceBox>
          </Popover>
        )
      }
      <A
        to={`/picture/${picture.id}`}
        state={{ backgroundLocation: location }}
      />
      <ItemBox>
        {
          picture.isPrivate ? (
            <Blurhash
              hash={picture.blurhash!}
              width="100%"
              height="100%"
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          ) : (
            <PictureImage
              blurhash={picture.blurhash}
              imgkey={picture.key}
            />
          )
        }
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
};
export default memo(PictureItem);
