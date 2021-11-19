/* eslint-disable max-len */
import React from 'react';

import { IIconProps } from './type';

export const Ordinary: React.FC<IIconProps> = ({
  size = 24,
  color = 'currentcolor',
  ...otherProps
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    version="1.1"
    color={color}
    {...otherProps}
  >
    <defs>
      <rect id="path-1" x="0" y="0" width="32" height="32" />
      <linearGradient x1="3.28842474%" y1="3.28842474%" x2="100%" y2="100%" id="linearGradient-3">
        <stop stopColor="#86A4FB" offset="0%" />
        <stop stopColor="#0050F0" offset="100%" />
      </linearGradient>
      <linearGradient x1="3.79670861%" y1="3.79670861%" x2="96.1626324%" y2="96.1626324%" id="linearGradient-4">
        <stop stopColor="#9FE0FE" offset="0%" />
        <stop stopColor="#5C9CFF" offset="100%" />
      </linearGradient>
      <path d="M11.3218233,4.70588235 L15.0017316,1.02597405 C15.55306,0.474645634 16.44694,0.474645634 16.9982684,1.02597405 L20.6781767,4.70588235 L25.8823529,4.70588235 C26.6620491,4.70588235 27.2941176,5.33795094 27.2941176,6.11764706 L27.2941176,11.3218233 L30.974026,15.0017316 C31.5253544,15.55306 31.5253544,16.44694 30.974026,16.9982684 L27.2941176,20.6781767 L27.2941176,25.8823529 C27.2941176,26.6620491 26.6620491,27.2941176 25.8823529,27.2941176 L20.6781767,27.2941176 L16.9982684,30.974026 C16.44694,31.5253544 15.55306,31.5253544 15.0017316,30.974026 L11.3218233,27.2941176 L6.11764706,27.2941176 C5.33795094,27.2941176 4.70588235,26.6620491 4.70588235,25.8823529 L4.70588235,20.6781767 L1.02597405,16.9982684 C0.474645634,16.44694 0.474645634,15.55306 1.02597405,15.0017316 L4.70588235,11.3218233 L4.70588235,6.11764706 C4.70588235,5.33795094 5.33795094,4.70588235 6.11764706,4.70588235 L11.3218233,4.70588235 Z" id="path-5" />
      <linearGradient x1="15.6961432%" y1="19.8730993%" x2="90.4214083%" y2="105.576504%" id="linearGradient-6">
        <stop stopColor="#93CFFE" offset="0%" />
        <stop stopColor="#5591F9" offset="100%" />
      </linearGradient>
    </defs>
    <g id="badges/editor's-choice_s" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g>
        <mask id="mask-2" fill="white">
          <use xlinkHref="#path-1" />
        </mask>
        <g id="Rectangle-8" />
        <g id="Group-4" mask="url(#mask-2)">
          <g id="Combined-Shape">
            <use fill="url(#linearGradient-3)" fillRule="evenodd" xlinkHref="#path-5" />
            <path stroke="url(#linearGradient-4)" strokeWidth="2.82352941" d="M16,2.02424244 L11.9065954,6.11764706 L6.11764706,6.11764706 L6.11764706,11.9065954 L2.02424244,16 L6.11764706,20.0934046 L6.11764706,25.8823529 L11.9065954,25.8823529 L16,29.9757576 L20.0934046,25.8823529 L25.8823529,25.8823529 L25.8823529,20.0934046 L29.9757576,16 L25.8823529,11.9065954 L25.8823529,6.11764706 L20.0934046,6.11764706 L16,2.02424244 Z" />
          </g>
          <polygon id="Star-2" fill="url(#linearGradient-6)" points="16.1381934 19.9687089 11.8183046 22.2398088 12.6433299 17.429542 9.14846652 14.0228921 13.978249 13.3210836 16.1381934 8.9445583 18.2981377 13.3210836 23.1279202 14.0228921 19.6330568 17.429542 20.4580821 22.2398088" />
        </g>
      </g>
    </g>
  </svg>
);
