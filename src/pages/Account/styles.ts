import { motion } from 'framer-motion';
import { rgba } from 'polished';
import styled from 'styled-components';

import { btnMixin } from 'styles/mixins';

export const Title = styled(motion.h2)`
  text-align: center;
  font-size: 32px;
  margin-bottom: 12px;
  font-weight: 700;
`;

export const Des = styled.div`
  font-weight: 400;
  color: rgb(138, 146, 169);
  text-align: center;
  margin-bottom: 24px;
`;

export const Button = styled.button`
  ${btnMixin}
  margin-top: 24px;
  width: 100%;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  box-shadow: 0 3px 11px -2px ${p => rgba(p.theme.primary, 0.6)};
  background-color: ${p => p.theme.primary};
  color: #fff;
`;

export const Tips = styled.div`
  font-size: 12px;
  color: #ccc;
  text-align: center;
  padding: 24px 0;
  padding-bottom: 16px;
`;

export const OauthBox = styled.section`
  display: flex;
  justify-content: center;
`;

export const GithubOauthBtn = styled.button`
  ${btnMixin}
  height: 38px;
  width: 38px;
  background: rgb(36, 41, 46);
  border-radius: 100%;
`;

export const WeiboOauthBtn = styled.button`
  ${btnMixin}
  height: 38px;
  width: 38px;
  background: rgb(255, 218, 93);
  margin-left: 12px;
  border-radius: 100%;
`;
