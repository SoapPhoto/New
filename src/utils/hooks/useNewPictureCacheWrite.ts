import type { PictureEntity } from '@app/common/types/modules/picture/picture.entity'
import type { IPaginationListData } from '@app/graphql/interface'
import { useApolloClient } from '@apollo/client'
import { PicturesType } from '@app/common/enum/picture'
import { Pictures } from '@app/graphql/query'

type ReturnType = [(newPicture: PictureEntity) => void]

export default function useNewPictureCacheWrite(): ReturnType {
  const client = useApolloClient()
  const write = (newPicture: PictureEntity) => {
    interface DataType {
      pictures: IPaginationListData<PictureEntity>
    }
    const cacheData = client.readQuery<DataType>({
      query: Pictures,
      variables: {
        type: PicturesType.NEW,
        query: {
          page: 1,
          pageSize: 20,
        },
      },
    })
    if (cacheData?.pictures?.data) {
      client.writeQuery<DataType>({
        query: Pictures,
        variables: {
          type: PicturesType.NEW,
          query: {
            page: 1,
            pageSize: 20,
          },
        },
        data: {
          pictures: {
            ...cacheData.pictures,
            data: [newPicture, ...cacheData.pictures.data],
          },
        },
      })
    }
  }
  return [write]
}
