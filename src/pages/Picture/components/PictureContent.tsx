import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useParams, Link } from 'react-router-dom';
import { css } from 'styled-components/macro';

import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { EmojiText, Popover } from '@app/components';
import Head from '@app/components/Head';
import { Lock, Hash, Ordinary } from '@app/components/Icons';
import { useAccount } from '@app/stores/hooks';
import useQueryPicture from '@app/utils/hooks/useQueryPicture';
import Comment from '@app/components/Comment';

import { useTranslation } from 'react-i18next';
import NotPage from '@app/pages/404';
import {
  Wrapper,
  Content,
  Title,
  Bio,
  TagBox,
  Tag,
} from '../elements';
import PictureSkeleton from '../Skeleton';
import CollectionModal from './CollectionModal';
import ExifModal from './ExifModal';
import HeaderUserInfo from './HeaderUserInfo';
import PictureCenter from './PictureCenter';
import PictureInfo from './PictureInfo';
import SettingModal from './SettingModal';

const PictureContent = observer(() => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { userInfo } = useAccount();
  const [{ loading, data, error }, cacheData] = useQueryPicture<{ picture: PictureEntity; }>(Number(id));
  const isMe = useMemo(() => data?.picture.user.id === userInfo?.id, [data?.picture.user.id, userInfo?.id]);
  if (error?.message) {
    if (error.message === 'Not Found') {
      return <NotPage title="Opoooos...!" />;
    }
  }
  if ((loading && (!data && !cacheData)) || (!data && !cacheData)) return <PictureSkeleton />;
  let picture: PictureEntity;
  if (data) {
    picture = data.picture;
  } else {
    picture = cacheData!;
  }
  return (
    <Wrapper>
      <Head title={`${picture.title} (@${picture.user?.name ?? ''})`} />
      {/* <NewContainer>
        <LeftBox>
          <PictureCenter picture={picture} />
        </LeftBox>
        <RightBox>
          <Title>
            <EmojiText text={picture.title} />
          </Title>
        </RightBox>
      </NewContainer> */}
      <HeaderUserInfo isMe={isMe} user={picture.user} createTime={picture.createTime} />
      <PictureCenter picture={picture} />
      <Content>
        <PictureInfo picture={picture} />
        {
          picture.location ? (
            <div
              css={css`
                display: flex;
                align-items: center;
                box-shadow: inset 0px -1px 0px ${(p) => p.theme.colors.border};
                padding: 12px 0;
                margin-bottom: 12px;
              `}
            >
              <EmojiText css={css`display: flex;align-items: center; margin-right: 6px;`} text="🏞️" />
              <div css={css`width: 6px;`} />
              {picture.location.city}
              <span css={css`margin: 0 4px;font-size: 14px;font-family: 700;`}>·</span>
              {picture.location.name}
            </div>
          ) : (
            <div css={css`height: 18px;`} />
          )
        }
        <Title>
          {
            picture.isPrivate && (
              <Popover
                trigger="hover"
                placement="top"
                theme="dark"
                openDelay={100}
                content={<span>私人</span>}
              >
                <Lock style={{ marginRight: '6px', strokeWidth: '3px' }} size={26} />
              </Popover>
            )
          }
          {
            picture.badge?.findIndex((v) => v.name === 'choice') >= 0 && (
              <Popover
                openDelay={100}
                trigger="hover"
                placement="top"
                theme="dark"
                content={<span>{t('label.choice')}</span>}
              >
                <div style={{ marginRight: 8 }}>
                  <Ordinary size={36} />
                </div>
              </Popover>
            )
          }
          <EmojiText text={picture.title} />
        </Title>
        {picture.bio && (
          <Bio>
            <EmojiText text={picture.bio} />
          </Bio>
        )}
        {picture.tags?.length > 0 && (
          <TagBox>
            {picture.tags?.map((tag) => (
              <Link to={`/tag/${tag.name}`} key={tag.id}>
                <Tag key={tag.id}>
                  <Hash size={12} />
                  <span css={css`margin-left: 4px;`}>
                    {tag.name}
                  </span>
                </Tag>
              </Link>
            ))}
          </TagBox>
        )}
        <div css={css`height: 12px;`} />
        {
          picture.user && (
            <Comment id={picture.id} author={picture.user} />
          )
        }
        <div css={css`height: 48px;`} />
      </Content>
      <ExifModal picture={picture} />
      {
        picture.user && (
          <SettingModal picture={picture} />
        )
      }
      {
        picture.user && (
          <CollectionModal picture={picture} />
        )
      }
    </Wrapper>
  );
});

export default PictureContent;
