export interface IPaginationListData<T> {
  count: number;
  data: T[];
  page: number;
  pageSize: number;
  timestamp: number;
}
