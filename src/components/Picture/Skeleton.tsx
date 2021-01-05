import React from 'react';
import {
  SkeletonContent,
  SkeletonItem,
  SkeletonAvatar,
  SkeletonName,
} from './elements';

const Skeleton = () => {
  return (
    <SkeletonContent>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => (
        <SkeletonItem key={i}>
          <SkeletonAvatar />
          <SkeletonName />
        </SkeletonItem>
      ))}
    </SkeletonContent>
  );
};

export default Skeleton;
