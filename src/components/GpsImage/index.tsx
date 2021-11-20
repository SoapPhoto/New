import React, { useMemo } from 'react';
import styled, { useTheme } from 'styled-components/macro';

import gcoord from 'gcoord';

// const getUrl = (gps: number[]) => `https://restapi.amap.com/v3/staticmap?location=${
//   gps[1]
// },${gps[0]}&zoom=15&size=600*300&scale=2&markers=mid,,A:${
//   gps[1]
// },${gps[0]}&key=e55a0b1eb15adb1ff24cec5a7aacd637`;

interface IProps {
  gps: number[];
  alt?: string;
  size?: string;
  zoom?: number;
}

const Wrapper = styled.div`
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  &>img {
    display: block;
    width: 100%;
  }
`;

export const GpsImage: React.FC<IProps> = ({
  gps,
  alt = '',
  zoom = 14,
  size = '600x300',
}) => {
  // const { mapbox } = useTheme();
  const gpsString = useMemo(() => gcoord.transform([gps[1], gps[0]], gcoord.GCJ02, gcoord.WGS84), [gps]).toString();
  const src = useMemo(() => `//api.mapbox.com/styles/v1/yiiu/ckw7m138o3p3514o5ey3k97qj/static/pin-s-attraction+285A98(${gpsString},${zoom})/${gpsString},${zoom},0,0/${size}@2x?access_token=${process.env.REACT_APP_MAPBOX_AK}&attribution=false&logo=false`, [gpsString, size, zoom]);
  return (
    <Wrapper>
      <img src={src} alt={alt} />
    </Wrapper>
  );
};
