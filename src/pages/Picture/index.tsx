import { useQuery } from '@apollo/client';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import { EmojiText } from '@app/components';
import Comment from '@app/components/Comment';
import { Picture } from '@app/graphql/query';
import { observer } from 'mobx-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CollectionModal from './components/CollectionModal';
import ExifModal from './components/ExifModal';
import HeaderUserInfo from './components/HeaderUserInfo';
import PictureCenter from './components/PictureCenter';
import PictureInfo from './components/PictureInfo';
import SettingModal from './components/SettingModal';

import {
  Wrapper,
  Content,
  Title,
  Bio,
  NewContainer,
  RightBox,
  LeftBox,
  TagBox,
  Tag,
} from './elements';
import PictureSkeleton from './Skeleton';

const PicturePage = observer(() => {
  const { id } = useParams();
  const { loading, data } = useQuery<{
    picture: PictureEntity;
  }>(Picture, {
    variables: { id: Number(id) },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  if ((loading && !data) || !data) return <PictureSkeleton />;
  const { picture } = data;
  const { user } = picture;
  return (
    <Wrapper>
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
      <HeaderUserInfo user={user} createTime={picture.createTime} />
      <PictureCenter picture={picture} />
      <Content>
        <PictureInfo picture={picture} />
        <Title>
          <EmojiText text={picture.title} />
        </Title>
        {picture.bio && (
          <Bio>
            <EmojiText text={picture.bio} />
          </Bio>
        )}
        {picture.tags.length > 0 && (
          <TagBox>
            {picture.tags.map(tag => (
              <Link to={`/tag/${tag.name}`} key={tag.id}>
                <Tag key={tag.id}>{tag.name}</Tag>
              </Link>
            ))}
          </TagBox>
        )}
        <Comment />
      </Content>
      <ExifModal picture={picture} />
      <SettingModal picture={picture} />
      <CollectionModal picture={picture} />
    </Wrapper>
  );
});
export default PicturePage;
