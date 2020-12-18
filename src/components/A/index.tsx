import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';

const A = styled(RouterLink)`
  color: ${p => p.theme.colors.primary};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
`;

export default A;
