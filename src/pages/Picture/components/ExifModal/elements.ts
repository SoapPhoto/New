import { rem } from 'polished';
import styled from 'styled-components';

export const Info = styled.div`
  padding: 24px;
  padding-top: 0;
`;

export const EXIFTitle = styled.div`
  font-size: 12px;
  color: ${P => P.theme.colors.secondary};
  margin-bottom: 4px;
`;

export const EXIFInfo = styled.div`
  font-size: 14px;
`;

export const EXIFBox = styled.div`
  display: grid;
  height: auto;
  grid-auto-flow: row;
  grid-auto-rows: minmax(20px, auto);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 24px;
`;
