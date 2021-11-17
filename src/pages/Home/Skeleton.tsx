import React from 'react';

import SkeletonCompoent from '@app/components/Picture/Skeleton';
import { Helmet } from 'react-helmet-async';
import Head from '@app/components/Head';

const Skeleton = () => (
  <>
    <Head title="首页" />
    <SkeletonCompoent />
  </>
);

export default Skeleton;
