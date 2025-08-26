import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import { Blurhash } from '@app/components'
import Head from '@app/components/Head'

import { NotFound } from '@app/components/page/NotFound'
import useQueryPicture from '@app/utils/hooks/useQueryPicture'
import { observer } from 'mobx-react'

import { useParams } from 'react-router'
import {
  ViewContent,
  Wrapper,
} from '../elements'
import PictureSkeleton from '../Skeleton'
import PictureCenter from './PictureCenter'

const PictureContent = observer(() => {
  const { id } = useParams()
  const [{ loading, data, error }, cacheData] = useQueryPicture<{ picture: PictureEntity }>(Number(id))
  if (error?.message) {
    if (error.message === 'Not Found') {
      return <NotFound />
    }
  }
  if ((loading && (!data && !cacheData)) || (!data && !cacheData))
    return <PictureSkeleton />
  let picture: PictureEntity
  if (data) {
    picture = data.picture
  }
  else {
    picture = cacheData!
  }
  return (
    <Wrapper>
      <Head title={`${picture.title} (@${picture.user?.name ?? ''})`} />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.05)',
        }}
      >

        <Blurhash
          hash={picture.blurhash!}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <ViewContent>
        <div>
          <PictureCenter picture={picture} />
        </div>
      </ViewContent>
    </Wrapper>
  )
})

export default PictureContent
