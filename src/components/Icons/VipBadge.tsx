/* eslint-disable max-len */
import React from 'react';

import { IIconProps } from './type';

export const VipBadge: React.FC<IIconProps> = ({
  size = 24,
  color = 'currentcolor',
  ...otherProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 21 23.4"
      style={{ color }}
      {...otherProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.392.268l8.392 4.846a2 2 0 0 1 1 1.732v9.69a2 2 0 0 1-1 1.732l-8.392 4.846a2 2 0 0 1-2 0L1 18.268a2 2 0 0 1-1-1.732v-9.69a2 2 0 0 1 1-1.732L9.392.268a2 2 0 0 1 2 0z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M5.385 8.812l8.737 6.433a.483.483 0 0 1 .188.511c-.047.2-.205.339-.385.339H6.322c-.403 0-.743-.342-.793-.798l-.145-6.485h.001z"
        fill="#fff"
      />
      <path
        d="M15.316 8.812l-.145 6.485c-.05.456-.39.798-.792.798H6.777c-.18 0-.339-.139-.385-.338-.047-.2.03-.41.187-.512l8.737-6.433z"
        fill="#fff"
      />
      <path
        d="M10.351 6.731l4.823 7.917a.99.99 0 0 1 .036.957.87.87 0 0 1-.772.49H6.263a.871.871 0 0 1-.772-.49.99.99 0 0 1 .036-.957l4.824-7.917z"
        fill="#FFFCF0"
      />
      <path
        d="M10.351 6.731l4.823 7.917a.99.99 0 0 1 .036.957.87.87 0 0 1-.772.49h-4.086V6.731h-.001z"
        fill="#FFEDCB"
      />
      <path
        d="M9.358 6.73c0 .576.444 1.04.993 1.04.548.001.993-.464.993-1.039 0-.574-.445-1.04-.993-1.04-.549 0-.993.466-.993 1.04zm4.965 2.082c0 .372.19.715.497.9a.954.954 0 0 0 .993 0 1.05 1.05 0 0 0 .496-.899c0-.575-.444-1.041-.993-1.041-.548 0-.993.466-.993 1.04zm-9.931 0c0 .575.445 1.04.993 1.04.549 0 .993-.465.993-1.04 0-.574-.444-1.04-.993-1.04-.548 0-.993.466-.993 1.04z"
        fill="#FFFCF0"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="10.392"
          x2="10.392"
          y2="23.382"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5C164" />
          <stop offset="1" stopColor="#FF9500" />
        </linearGradient>
      </defs>
    </svg>
  );
};
