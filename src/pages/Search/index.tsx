import React, { useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SearchPictures } from '@app/graphql/query';
import { NetworkStatus, useQuery } from '@apollo/client';
import { ListQueryData } from '@app/graphql/interface';
import { PictureEntity } from '@app/common/types/modules/picture/picture.entity';
import usePicturePagination from '@app/utils/hooks/usePicturePagination';
import PictureList from '@app/components/Picture/List';
import Skeleton from '@app/components/Picture/Skeleton';
import Input from '@app/components/Input';
import styled, { css } from 'styled-components/macro';
import { Search, X } from '@app/components/Icons';
import IconButton from '@app/components/Button/IconButton';
import Empty from '@app/components/Empty';

const SerachBox = styled.div`
  width: 100%;
  max-width: 628px;
  margin: 0 auto;
  transform: translateY(-50%);
  position: relative;
`;

const SearchInput = styled.input`
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  height: 64px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 8px 20px rgb(0 0 0 / 6%);
  width: 100%;
  padding: 24px 24px 24px 64px;
  font-size: 24px;
  font-weight: 400;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 24px;
  top: 50%;
  margin-top: -10px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const XIcon = styled(X)`
  color: ${({ theme }) => theme.colors.secondary};
`;

const SearchPage = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [words, setWords] = useState(search);
  const {
    loading, data, fetchMore, networkStatus,
  } = useQuery<ListQueryData<'searchPictures', PictureEntity>>(SearchPictures, {
    variables: {
      query: { page: 1, pageSize: 30 },
      words: search,
    },
  });
  const handle = async (current) => {
    console.log(current);
  };
  const [more, notData, noMore] = usePicturePagination(data?.searchPictures, handle, loading, networkStatus);
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate(`/s/${words?.trim()}`);
    }
  };
  return (
    <div
      style={{
        paddingTop: 0,
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      <div
        css={css`
          width: 100%;
          height: 80px;
          background: ${(({ theme }) => theme.colors.gray2)};
        `}
      />
      <SerachBox>
        <SearchInput
          value={words}
          onChange={(e) => setWords(e.target.value)}
          type="search"
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onKeyPress={onKeyPress}
          placeholder="关键词"
        >
          {/* <input /> */}
        </SearchInput>
        <SearchIcon size={20} />
        {
          words?.trim() && (
            <IconButton
              css={css`
              position: absolute;
              top: 50%;
              margin-top: -12px;
              right: 24px;
            `}
              onClick={() => setWords('')}
            >
              <XIcon />
            </IconButton>
          )
        }
      </SerachBox>
      {
        search ? (
          <div
            css={css`padding: 28px;`}
          >
            { notData ? (
              <div>
                <Skeleton />
              </div>
            ) : (
              <div>
                {
                  data!.searchPictures.data.length === 0 ? (
                    <Empty emptyText="无无无无无无无无" />
                  ) : (
                    <PictureList onPage={more} noMore={noMore} list={data!.searchPictures.data} />
                  )
                }
              </div>
            )}
          </div>
        ) : (
          <Empty emptyText="搜一搜" />
        )
      }
    </div>
  );
};

export default SearchPage;
