import Loadable from '@loadable/component'
import React from 'react'
import Skeleton from './Skeleton'

export default Loadable(() => import(/** webpackChunkName: "user" */'.'), {
  fallback: <Skeleton />,
})
