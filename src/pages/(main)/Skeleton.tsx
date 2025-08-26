import Head from '@app/components/Head'

import SkeletonCompoent from '@app/components/Picture/Skeleton'
import React from 'react'

function Skeleton() {
  return (
    <>
      <Head title="首页" />
      <SkeletonCompoent />
    </>
  )
}

export default Skeleton
