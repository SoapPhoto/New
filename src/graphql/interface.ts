import { PicturesType } from '@app/common/enum/picture';

export interface IPaginationListData<T> {
  count: number;
  data: T[];
  page: number;
  pageSize: number;
  timestamp: number;
}

export type QueryData<V extends keyof any, T> = {
  [K in V]: T;
};

export type ListQueryData<V extends keyof any, T> = QueryData<
  V,
  IPaginationListData<T>
>;

export type PicturesQueryVariables = {
  query: BaseQueryInput;
  type: PicturesType;
};

export type BaseQueryInput = {
  /** 分页 */
  page: number;
  /** 分页 */
  pageSize: number;
  /** 时间戳 */
  timestamp?: number;
};
