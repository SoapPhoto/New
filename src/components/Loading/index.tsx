import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components/macro';

interface ILoadingProps {
  size?: number;
  color?: string;
}

const animate = keyframes`
  0%{
    transform: rotate(0deg)
  }
  100%{
    transform: rotate(360deg)
  }
`;

export const Box = styled.div<{ size: number }>`
  border-radius: 50%;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Percent = styled.div<{ color: string }>`
  position: relative;
  font-size: 0.65rem;
  font-weight: 700;
  color: ${p => p.color};
  margin-top: 1px;
  z-index: 200;
`;

const Animation1 = styled.div<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid ${p => p.color};
  border-radius: inherit;
  border-top: 3px solid transparent;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  animation: ${animate} 0.8s ease infinite;
  top: 0;
`;

const Animation2 = styled.div<{ color: string }>`
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px dashed ${p => p.color};
  border-radius: inherit;
  border-top: 3px solid transparent;
  border-left: 3px solid transparent;
  border-right: 3px solid transparent;
  animation: ${animate} 0.8s linear infinite;
  opacity: 0.2;
`;

const Loading: React.FC<ILoadingProps> = ({ size = 32, color }) => {
  const theme = useTheme();
  let defaultColor = color || theme.colors.primary;
  return (
    <Box size={size}>
      <Percent color={defaultColor} />
      <Animation1 color={defaultColor} />
      <Animation2 color={defaultColor} />
    </Box>
  );
};

export default Loading;
