import styled from 'styled-components';

export const Wrapper = styled.div<{ size: number; color: string }>`
  --soap-color: ${p => p.color};
  position: relative;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  min-width: ${p => p.size}px;
  min-height: ${p => p.size}px;
  background: var(--soap-color);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.text};
  border-radius: 100%;
  transition: all 0.25s ease;
  box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.05);
`;

export const Text = styled.div<{ total: number }>`
  font-size: ${p =>
    p.total > 1 ? (p.total > 6 ? 0.5 : (10 - p.total + 2) / 10) : 1}rem;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  border-radius: inherit;
  user-select: none;
`;
