import React from 'react';
import styled, { useTheme } from 'styled-components/macro';
import { Loading } from '..';

interface IEmptyProps {
  loading?: boolean;
  emptyText?: string;
  size?: 'small' | 'large';
}

const Wrapper = styled.div<{ size?: 'small' | 'large' }>`
  text-align: center;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${_ => _.theme.colors.secondary};
  font-weight: 400;
  ${_ =>
    _.size === 'small' &&
    `
    height: 80px;
    font-size: 14px;
  `}
`;

const Empty: React.FC<IEmptyProps> = ({ loading = false, emptyText, size }) => {
  const { colors } = useTheme();
  const loadingSize = size === 'small' ? 6 : 8;
  return (
    <Wrapper size={size}>
      {loading ? (
        <Loading size={loadingSize} color={colors.secondary} />
      ) : (
        <span>{emptyText}</span>
      )}
    </Wrapper>
  );
};

export default Empty;
