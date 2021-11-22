import React from 'react';
import Loadable from '@loadable/component';
import Skeleton from './Skeleton';

export default Loadable(() => import(/** webpackChunkName: "user" */'.'), {
  fallback: <Skeleton />,
});
