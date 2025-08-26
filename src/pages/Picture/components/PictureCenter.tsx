import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import type { LoadingIndicatorRef } from '@app/components/ProgressiveImage/components/LoadingIndicator'

import { WebGLImageViewer } from '@afilmory/webgl-viewer'
import { LoadingIndicator } from '@app/components/ProgressiveImage/components/LoadingIndicator'
import { ProgressiveImage } from '@app/components/ProgressiveImage/ProgressiveImage'

import { getPictureUrl } from '@app/utils/image'
import React, { useRef } from 'react'
import {
  PictureBox,
  PictureContent,
  PictureImage,
  PictureImageBox,
  PictureWrapper,
} from '../elements'
import 'react-photo-view/dist/react-photo-view.css'

interface IProps {
  picture: PictureEntity
}

const PictureCenter: React.FC<IProps> = ({ picture }) => {
  const loadingIndicatorRef = useRef<LoadingIndicatorRef>(null)

  return (
    <PictureWrapper>
      <PictureContent>
        <PictureImage>
          <LoadingIndicator ref={loadingIndicatorRef} />
          <ProgressiveImage
            isCurrentImage
            thumbnailSrc={getPictureUrl(picture.key, 'medium')}
            src={getPictureUrl(picture.key, 'original', false)}
            alt=""
            width={picture.width}
            height={picture.height}
            loadingIndicatorRef={loadingIndicatorRef}
          />
        </PictureImage>
      </PictureContent>
    </PictureWrapper>
  )
}

export default PictureCenter
