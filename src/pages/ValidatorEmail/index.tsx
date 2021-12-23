import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components/macro';

import Header from '@app/components/Header';
import useUrlQuery from '@app/utils/hooks/useUrlQuery';
import { validatorEmail } from '@app/services/auth';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { boxMixin } from '@app/styles/mixins';
import { Loading } from '@app/components';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  min-height: 100vh;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
`;

const Box = styled.div`
  ${({ theme }) => boxMixin(theme, '400px')}
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ValidatorEmailPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();
  const query = useUrlQuery();
  const valid = useCallback(async () => {
    try {
      await validatorEmail(query as any);
    } catch (err: any) {
      toast.error(t(`backend_error.${err.message}` as any));
      setError(err.message);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    valid();
  }, [query, valid]);
  return (
    <Wrapper>
      <Header right={false} />
      <div
        css={css`
          height: calc(100vh - 84px);
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: center;
        `}
      >
        <Box>
          {
            // eslint-disable-next-line no-nested-ternary
            loading ? (
              <Loading />
            ) : error ? (
              <Title css={css`color: ${({ theme }) => theme.colors.error};`}>
                {t(`backend_error.${error}` as any)}
              </Title>
            ) : (
              <Title css={css`color: ${({ theme }) => theme.colors.green};`}>
                验证成功
              </Title>
            )
          }
        </Box>
      </div>
    </Wrapper>
  );
};

export default ValidatorEmailPage;
