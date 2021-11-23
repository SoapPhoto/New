import { NetworkStatus } from '@apollo/client';
import { IPaginationListData } from '@app/graphql/interface';
import { useMemo, useRef } from 'react';

type MoreFunc = (current: number) => Promise<void>;

export default function usePicturePagination(data: IPaginationListData<any> | undefined, more: MoreFunc, loading: boolean, networkStatus: NetworkStatus): [() => Promise<void>, boolean, boolean] {
  const currentPage = useRef(data?.page ?? 1);
  const maxPage = useMemo(() => (data ? Math.ceil(data.count / data.pageSize) : 0), [data]);
  const notData = useMemo(() => (loading && networkStatus === NetworkStatus.loading) || !data, [data, loading, networkStatus]);
  const noMore = useMemo(() => {
    if (!data) {
      return true;
    }
    return data.page >= maxPage;
  }, [data, maxPage]);
  const onHandle = async () => {
    if (!data || networkStatus !== NetworkStatus.ready) {
      return;
    }
    if (noMore) {
      return;
    }
    currentPage.current += 1;
    await more(currentPage.current);
  };
  return [onHandle, notData, noMore];
}
