/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AddCollectionInput = {
  /** 介绍 */
  bio?: InputMaybe<Scalars['String']['input']>;
  /** 私人 */
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  /** 名字 */
  name?: InputMaybe<Scalars['String']['input']>;
};

export type AddCommentInput = {
  /** 评论内容 */
  content?: InputMaybe<Scalars['String']['input']>;
};

export type AddPictureCollectionInput = {
  /** 图片id */
  pictureId: Scalars['Float']['input'];
};

export type Badge = {
  __typename?: 'Badge';
  id?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['String']['output']>;
  type?: Maybe<BadgeType>;
};

export enum BadgeType {
  Picture = 'PICTURE',
  User = 'USER'
}

export type BaseCountData = {
  count?: Maybe<Scalars['Float']['output']>;
};

export type BaseList = {
  count?: Maybe<Scalars['Float']['output']>;
  page?: Maybe<Scalars['Float']['output']>;
  pageSize?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export type BaseNode = {
  createTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  updateTime?: Maybe<Scalars['DateTime']['output']>;
};

export type Classify = {
  __typename?: 'Classify';
  keyword?: Maybe<Scalars['String']['output']>;
  root?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
};

export type Collection = BaseNode & {
  __typename?: 'Collection';
  /** 介绍 */
  bio?: Maybe<Scalars['String']['output']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['DateTime']['output']>;
  /** id */
  id: Scalars['Float']['output'];
  /** 私人 */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** 名字 */
  name?: Maybe<Scalars['String']['output']>;
  /** 图片数量 */
  pictureCount?: Maybe<Scalars['Float']['output']>;
  /** 收藏夹预览 */
  preview?: Maybe<Array<Picture>>;
  /** 修改时间 */
  updateTime?: Maybe<Scalars['DateTime']['output']>;
  /** 图片作者 */
  user?: Maybe<User>;
};

export type Collections = BaseList & {
  __typename?: 'Collections';
  count?: Maybe<Scalars['Float']['output']>;
  data: Array<Collection>;
  page?: Maybe<Scalars['Float']['output']>;
  pageSize?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export type CollectionsQueryInput = {
  /** 分页 */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** 分页 */
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  /** 时间戳 */
  timestamp?: InputMaybe<Scalars['Float']['input']>;
};

export type Comment = BaseNode & {
  __typename?: 'Comment';
  /** 子评论 */
  childComments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']['output']>;
  createTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  ip?: Maybe<Scalars['String']['output']>;
  parentComment?: Maybe<Comment>;
  /** 评论的图片 */
  picture?: Maybe<Picture>;
  replyComment?: Maybe<Comment>;
  replyUser?: Maybe<User>;
  /** 子评论数量 */
  subCount?: Maybe<Scalars['Float']['output']>;
  updateTime?: Maybe<Scalars['DateTime']['output']>;
  /** 评论作者 */
  user?: Maybe<User>;
  userAgent?: Maybe<Scalars['String']['output']>;
};


export type CommentChildCommentsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type Comments = BaseList & {
  __typename?: 'Comments';
  count?: Maybe<Scalars['Float']['output']>;
  data: Array<Comment>;
  page?: Maybe<Scalars['Float']['output']>;
  pageSize?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export type CommentsQueryInput = {
  /** 分页 */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** 分页 */
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  /** 时间戳 */
  timestamp?: InputMaybe<Scalars['Float']['input']>;
};

export type Count = {
  __typename?: 'Count';
  count?: Maybe<Scalars['Float']['output']>;
};

export type Exif = {
  __typename?: 'EXIF';
  ISO?: Maybe<Scalars['Float']['output']>;
  aperture?: Maybe<Scalars['Float']['output']>;
  exposureTime?: Maybe<Scalars['String']['output']>;
  focalLength?: Maybe<Scalars['Float']['output']>;
  location?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
};

export type Follow = {
  __typename?: 'Follow';
  createTime?: Maybe<Scalars['DateTime']['output']>;
  /** 被关注的人 */
  followed?: Maybe<User>;
  /** 关注的人 */
  follower?: Maybe<User>;
  updateTime?: Maybe<Scalars['DateTime']['output']>;
};

export type FollowUserInput = {
  userId: Scalars['Float']['input'];
};

export type FollowUsersQueryInput = {
  /** 分页 */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** 分页 */
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  /** 时间戳 */
  timestamp?: InputMaybe<Scalars['Float']['input']>;
};

export type Invite = BaseNode & {
  __typename?: 'Invite';
  /** code */
  code?: Maybe<Scalars['String']['output']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['DateTime']['output']>;
  /** id */
  id: Scalars['Float']['output'];
  /** 修改时间 */
  updateTime?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type LikePictureReq = {
  __typename?: 'LikePictureReq';
  count?: Maybe<Scalars['Float']['output']>;
  isLike?: Maybe<Scalars['Boolean']['output']>;
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']['output']>;
  area?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  detail?: Maybe<LocationDetail>;
  district?: Maybe<Scalars['String']['output']>;
  location?: Maybe<SearchPlaceDetailLocation>;
  name?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  street_id?: Maybe<Scalars['String']['output']>;
  telephone?: Maybe<Scalars['String']['output']>;
  uid?: Maybe<Scalars['String']['output']>;
};

export type LocationBaseInput = {
  clientType?: InputMaybe<LocationClientType>;
};

export enum LocationClientType {
  Baidu = 'BAIDU',
  Mapbox = 'MAPBOX'
}

export type LocationDetail = {
  __typename?: 'LocationDetail';
  comment_num?: Maybe<Scalars['String']['output']>;
  content_tag?: Maybe<Scalars['String']['output']>;
  detail_url?: Maybe<Scalars['String']['output']>;
  image_num?: Maybe<Scalars['String']['output']>;
  navi_location?: Maybe<SearchPlaceDetailLocation>;
  overall_rating?: Maybe<Scalars['String']['output']>;
  scope_type?: Maybe<Scalars['String']['output']>;
  shop_hours?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBadge?: Maybe<Status>;
  /** 新增收藏夹 */
  addCollection?: Maybe<Collection>;
  addComment?: Maybe<Comment>;
  /** 添加图片到收藏夹 */
  addPictureCollection?: Maybe<Collection>;
  createInvite?: Maybe<Invite>;
  deleteCollection?: Maybe<Status>;
  deletePicture?: Maybe<Status>;
  followUser?: Maybe<Status>;
  /** 喜欢图片 */
  likePicture?: Maybe<Picture>;
  markNotificationReadAll?: Maybe<Status>;
  /** 从收藏夹删除图片 */
  removePictureCollection?: Maybe<Status>;
  unFollowUser?: Maybe<Status>;
  /** 取消喜欢图片 */
  unlikePicture?: Maybe<Picture>;
  /** 编辑收藏夹 */
  updateCollection?: Maybe<Collection>;
  /** 修改封面 */
  updateCover?: Maybe<User>;
  updatePicture?: Maybe<Picture>;
  /** 修改用户信息 */
  updateProfile?: Maybe<User>;
};


export type MutationAddBadgeArgs = {
  badgeId: Scalars['Float']['input'];
  targetId: Scalars['Float']['input'];
  type: BadgeType;
};


export type MutationAddCollectionArgs = {
  data: AddCollectionInput;
};


export type MutationAddCommentArgs = {
  commentId?: InputMaybe<Scalars['Float']['input']>;
  data: AddCommentInput;
  id: Scalars['Float']['input'];
};


export type MutationAddPictureCollectionArgs = {
  id: Scalars['Float']['input'];
  pictureId: Scalars['Float']['input'];
};


export type MutationDeleteCollectionArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePictureArgs = {
  id: Scalars['Float']['input'];
};


export type MutationFollowUserArgs = {
  input?: InputMaybe<FollowUserInput>;
};


export type MutationLikePictureArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemovePictureCollectionArgs = {
  id: Scalars['Float']['input'];
  pictureId: Scalars['Float']['input'];
};


export type MutationUnFollowUserArgs = {
  input?: InputMaybe<FollowUserInput>;
};


export type MutationUnlikePictureArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateCollectionArgs = {
  data: AddCollectionInput;
  id: Scalars['Float']['input'];
};


export type MutationUpdateCoverArgs = {
  cover: Scalars['String']['input'];
};


export type MutationUpdatePictureArgs = {
  data: UpdatePictureInput;
  id: Scalars['Float']['input'];
};


export type MutationUpdateProfileArgs = {
  data: UpdateProfileInput;
};

export type NewPicturesQueryInput = {
  /** 起始时间戳 */
  lastTimestamp?: InputMaybe<Scalars['Float']['input']>;
  /** 分页 */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** 分页 */
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  /** 时间戳 */
  timestamp?: InputMaybe<Scalars['Float']['input']>;
};

export type Notification = BaseNode & {
  __typename?: 'Notification';
  /** 种类 */
  category?: Maybe<NotificationCategory>;
  comment?: Maybe<Comment>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  /** 是否已读 */
  media?: Maybe<NotificationMedia>;
  picture?: Maybe<Picture>;
  /** 消息发布者 */
  publisher?: Maybe<User>;
  /** 是否已读 */
  read?: Maybe<Scalars['Boolean']['output']>;
  /** 修改时间 */
  updateTime?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export enum NotificationCategory {
  Comment = 'COMMENT',
  Follow = 'FOLLOW',
  Liked = 'LIKED',
  Reply = 'REPLY'
}

export type NotificationMedia = Collection | Comment | Picture | User;

export enum NotificationType {
  System = 'SYSTEM',
  User = 'USER'
}

/** 图片 */
export type Picture = BaseNode & {
  __typename?: 'Picture';
  /** 徽章 */
  badge?: Maybe<Array<Maybe<Badge>>>;
  /** 图片介绍 */
  bio?: Maybe<Scalars['String']['output']>;
  /** blurhash */
  blurhash?: Maybe<Scalars['String']['output']>;
  /** blurhash src */
  blurhashSrc?: Maybe<Scalars['String']['output']>;
  /** 图片智能标签 */
  classify?: Maybe<Array<Maybe<Classify>>>;
  /** 图片的主色调 */
  color?: Maybe<Scalars['String']['output']>;
  /** 图片评论数量 */
  commentCount?: Maybe<Scalars['Float']['output']>;
  /** 创建时间 */
  createTime?: Maybe<Scalars['DateTime']['output']>;
  /** 当前用户收藏了此图片的收藏夹列表 */
  currentCollections?: Maybe<Array<Maybe<Collection>>>;
  /** EXIF信息 */
  exif?: Maybe<Exif>;
  /** 七牛的hash */
  hash?: Maybe<Scalars['String']['output']>;
  /** 图片长度 */
  height?: Maybe<Scalars['Float']['output']>;
  /** id */
  id: Scalars['Float']['output'];
  /** 图片的颜色是明还是暗 */
  isDark?: Maybe<Scalars['Boolean']['output']>;
  /** 当前登录用户是否喜欢 */
  isLike?: Maybe<Scalars['Boolean']['output']>;
  /** 是否是私人的 */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** 七牛的key */
  key?: Maybe<Scalars['String']['output']>;
  /** picture喜欢的数量 */
  likedCount?: Maybe<Scalars['Float']['output']>;
  /** 位置信息 */
  location?: Maybe<Location>;
  /** 设备品牌 */
  make?: Maybe<Scalars['String']['output']>;
  /** 图片类型 */
  mimetype?: Maybe<Scalars['String']['output']>;
  /** 设备型号 */
  model?: Maybe<Scalars['String']['output']>;
  /** 图片原始文件名 */
  originalname?: Maybe<Scalars['String']['output']>;
  /** 当前用户收藏了此图片的收藏夹列表 */
  relatedCollections?: Maybe<PictureRelatedCollectionReq>;
  /** 图片大小 */
  size?: Maybe<Scalars['Float']['output']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  /** 图片标题 */
  title?: Maybe<Scalars['String']['output']>;
  /** 修改时间 */
  updateTime?: Maybe<Scalars['DateTime']['output']>;
  /** 图片作者 */
  user?: Maybe<User>;
  /** 浏览次数 */
  views?: Maybe<Scalars['Float']['output']>;
  /** 图片宽度 */
  width?: Maybe<Scalars['Float']['output']>;
};


/** 图片 */
export type PictureRelatedCollectionsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type PictureLocation = {
  __typename?: 'PictureLocation';
  /** 坐标所在商圈信息 */
  business?: Maybe<Scalars['String']['output']>;
  /** 城市名 */
  city?: Maybe<Scalars['String']['output']>;
  /** 国家 */
  country?: Maybe<Scalars['String']['output']>;
  /** 国家代码 */
  country_code?: Maybe<Scalars['String']['output']>;
  /** 区县名 */
  district?: Maybe<Scalars['String']['output']>;
  /** 结构化地址信息 */
  formatted_address?: Maybe<Scalars['String']['output']>;
  location?: Maybe<SearchPlaceDetailLocation>;
  pois?: Maybe<Array<Maybe<Poi>>>;
  /** 省名 */
  province?: Maybe<Scalars['String']['output']>;
  /** 乡镇名 */
  town?: Maybe<Scalars['String']['output']>;
};

export type PictureRelatedCollectionReq = BaseCountData & {
  __typename?: 'PictureRelatedCollectionReq';
  count?: Maybe<Scalars['Float']['output']>;
  data: Array<Collection>;
};

export type Pictures = BaseList & {
  __typename?: 'Pictures';
  count?: Maybe<Scalars['Float']['output']>;
  data: Array<Picture>;
  page?: Maybe<Scalars['Float']['output']>;
  pageSize?: Maybe<Scalars['Float']['output']>;
  timestamp?: Maybe<Scalars['Float']['output']>;
};

export type PicturesQueryInput = {
  /** 分页 */
  page?: InputMaybe<Scalars['Float']['input']>;
  /** 分页 */
  pageSize?: InputMaybe<Scalars['Float']['input']>;
  /** 时间戳 */
  timestamp?: InputMaybe<Scalars['Float']['input']>;
};

export enum PicturesType {
  Choice = 'CHOICE',
  Feed = 'FEED',
  Hot = 'HOT',
  New = 'NEW'
}

export type Poi = {
  __typename?: 'Poi';
  addr?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  poiType?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  childComments?: Maybe<Comments>;
  /** 获取收藏夹详情 */
  collection?: Maybe<Collection>;
  /** 获取收藏夹图片列表 */
  collectionPictures?: Maybe<Pictures>;
  comments?: Maybe<Comments>;
  /** 关注的用户 */
  followedUsers?: Maybe<Array<Maybe<User>>>;
  /** 粉丝 */
  followerUsers?: Maybe<Array<Maybe<User>>>;
  getBadges?: Maybe<Array<Maybe<Badge>>>;
  /** 获取更新图片列表 */
  newPictures?: Maybe<Pictures>;
  /** 获取单个图片 */
  picture?: Maybe<Picture>;
  /** 获取图片相关收藏夹 */
  pictureRelatedCollection?: Maybe<PictureRelatedCollectionReq>;
  /** 获取相关图片 */
  pictureRelatedPictures: Array<Picture>;
  /** 获取图片列表 */
  pictures?: Maybe<Pictures>;
  /** Poi详情 */
  placeDetail?: Maybe<Location>;
  /** 地址输入提示 */
  placeSuggestion?: Maybe<Array<Maybe<Location>>>;
  /** 你想地理编码数据 */
  reverseGeocoding?: Maybe<PictureLocation>;
  /** 获取单个图片 */
  searchPictures?: Maybe<Pictures>;
  /** 搜索位置信息 */
  searchPlace?: Maybe<Array<Maybe<Location>>>;
  /** 获取单个用户信息 */
  tag?: Maybe<Tag>;
  tagPictures?: Maybe<Pictures>;
  unreadNotificationCount?: Maybe<Count>;
  /** 获取单个用户信息 */
  user?: Maybe<User>;
  /** 获取用户的收藏夹列表 */
  userCollectionsById?: Maybe<Collections>;
  /** 获取用户的收藏夹列表 */
  userCollectionsByName?: Maybe<Collections>;
  userNotification?: Maybe<Array<Maybe<Notification>>>;
  /** 获取用户的图片 */
  userPictures?: Maybe<Pictures>;
  userPicturesById?: Maybe<Pictures>;
  userPicturesByName?: Maybe<Pictures>;
  /** 获取登录用户信息 */
  whoami?: Maybe<User>;
};


export type QueryChildCommentsArgs = {
  id: Scalars['Float']['input'];
  query?: InputMaybe<CommentsQueryInput>;
};


export type QueryCollectionArgs = {
  id: Scalars['Float']['input'];
};


export type QueryCollectionPicturesArgs = {
  id: Scalars['Float']['input'];
  query?: InputMaybe<PicturesQueryInput>;
};


export type QueryCommentsArgs = {
  id: Scalars['Float']['input'];
  query?: InputMaybe<CommentsQueryInput>;
};


export type QueryFollowedUsersArgs = {
  id?: InputMaybe<Scalars['Float']['input']>;
  query?: InputMaybe<FollowUsersQueryInput>;
};


export type QueryFollowerUsersArgs = {
  id?: InputMaybe<Scalars['Float']['input']>;
  query?: InputMaybe<FollowUsersQueryInput>;
};


export type QueryGetBadgesArgs = {
  targetId: Scalars['Float']['input'];
  type: BadgeType;
};


export type QueryNewPicturesArgs = {
  query: NewPicturesQueryInput;
};


export type QueryPictureArgs = {
  id: Scalars['Float']['input'];
};


export type QueryPictureRelatedCollectionArgs = {
  id: Scalars['Float']['input'];
};


export type QueryPictureRelatedPicturesArgs = {
  id: Scalars['Float']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryPicturesArgs = {
  query: PicturesQueryInput;
  type?: InputMaybe<PicturesType>;
};


export type QueryPlaceDetailArgs = {
  uid: Scalars['String']['input'];
};


export type QueryPlaceSuggestionArgs = {
  region: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type QueryReverseGeocodingArgs = {
  config?: InputMaybe<LocationBaseInput>;
  location?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchPicturesArgs = {
  query: PicturesQueryInput;
  words: Scalars['String']['input'];
};


export type QuerySearchPlaceArgs = {
  clientType?: InputMaybe<LocationClientType>;
  region: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type QueryTagArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTagPicturesArgs = {
  name: Scalars['String']['input'];
  query?: InputMaybe<PicturesQueryInput>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserCollectionsByIdArgs = {
  id: Scalars['Float']['input'];
  query: CollectionsQueryInput;
};


export type QueryUserCollectionsByNameArgs = {
  query?: InputMaybe<CollectionsQueryInput>;
  username: Scalars['String']['input'];
};


export type QueryUserPicturesArgs = {
  id: Scalars['Float']['input'];
  query: PicturesQueryInput;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserPicturesByIdArgs = {
  id: Scalars['Float']['input'];
  query?: InputMaybe<PicturesQueryInput>;
  type?: InputMaybe<UserPictureType>;
};


export type QueryUserPicturesByNameArgs = {
  query: PicturesQueryInput;
  type?: InputMaybe<UserPictureType>;
  username: Scalars['String']['input'];
};

export type SearchPlaceDetailInfo = {
  __typename?: 'SearchPlaceDetailInfo';
  tag?: Maybe<Scalars['String']['output']>;
};

export type SearchPlaceDetailLocation = {
  __typename?: 'SearchPlaceDetailLocation';
  lat?: Maybe<Scalars['Float']['output']>;
  lng?: Maybe<Scalars['Float']['output']>;
};

export type Status = {
  __typename?: 'Status';
  done?: Maybe<Scalars['Boolean']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotification?: Maybe<Notification>;
  userOnlineStatus?: Maybe<UserOnlineStatus>;
};


export type SubscriptionUserOnlineStatusArgs = {
  id: Scalars['Float']['input'];
};

/** 标签 */
export type Tag = BaseNode & {
  __typename?: 'Tag';
  createTime?: Maybe<Scalars['DateTime']['output']>;
  /** id */
  id: Scalars['Float']['output'];
  /** 标签名称 */
  name?: Maybe<Scalars['String']['output']>;
  /** 图片数量 */
  pictureCount?: Maybe<Scalars['Float']['output']>;
  updateTime?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdatePictureInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
  locationUid?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  birthdayShow?: InputMaybe<Scalars['Float']['input']>;
  gender?: InputMaybe<Scalars['Float']['input']>;
  genderSecret?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

/** 用户 */
export type User = BaseNode & {
  __typename?: 'User';
  /** 用户头像 */
  avatar?: Maybe<Scalars['String']['output']>;
  /** 徽章 */
  badge?: Maybe<Array<Maybe<Badge>>>;
  /** 个人介绍 */
  bio?: Maybe<Scalars['String']['output']>;
  /** 生日 */
  birthday?: Maybe<Scalars['String']['output']>;
  /** 生日的显示 */
  birthdayShow?: Maybe<Scalars['Float']['output']>;
  /** 用户封面 */
  cover?: Maybe<Scalars['String']['output']>;
  createTime?: Maybe<Scalars['DateTime']['output']>;
  /** 邮箱 */
  email?: Maybe<Scalars['String']['output']>;
  /** 关注的人数量 */
  followedCount?: Maybe<Scalars['Float']['output']>;
  /** 粉丝数量 */
  followerCount?: Maybe<Scalars['Float']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  /** 性别 */
  gender?: Maybe<Scalars['Float']['output']>;
  /** 性别 */
  genderSecret?: Maybe<Scalars['Boolean']['output']>;
  /** id */
  id: Scalars['Float']['output'];
  /** 是否验证邮箱 */
  isEmailVerified?: Maybe<Scalars['Boolean']['output']>;
  /** 是否关注 */
  isFollowing?: Maybe<Scalars['Float']['output']>;
  /** 在线状态 */
  isOnline?: Maybe<Scalars['Boolean']['output']>;
  /** 是否有设置密码 */
  isPassword?: Maybe<Scalars['Boolean']['output']>;
  /** 是否私人 */
  isPrivate?: Maybe<Scalars['Boolean']['output']>;
  /** 喜欢的picture数量 */
  likedCount?: Maybe<Scalars['Float']['output']>;
  /** 用户被喜欢的数量 */
  likesCount?: Maybe<Scalars['Float']['output']>;
  /** 显示的名称 */
  name?: Maybe<Scalars['String']['output']>;
  /** 用户的picture数量 */
  pictureCount?: Maybe<Scalars['Float']['output']>;
  pictures?: Maybe<Array<Maybe<Picture>>>;
  /** 注册方式 */
  signupType?: Maybe<UserSignupType>;
  status?: Maybe<UserStatusType>;
  updateTime?: Maybe<Scalars['DateTime']['output']>;
  /** 用户名 */
  username?: Maybe<Scalars['String']['output']>;
  /** 个人网站 */
  website?: Maybe<Scalars['String']['output']>;
};


/** 用户 */
export type UserAvatarArgs = {
  size?: InputMaybe<Scalars['Float']['input']>;
};


/** 用户 */
export type UserPicturesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type UserCoverRes = {
  __typename?: 'UserCoverRes';
  cover: Scalars['String']['output'];
  id: Scalars['Float']['output'];
};

export type UserOnlineStatus = {
  __typename?: 'UserOnlineStatus';
  online: Scalars['Boolean']['output'];
};

export enum UserPictureType {
  Choice = 'CHOICE',
  Liked = 'LIKED',
  My = 'MY'
}

export enum UserSignupType {
  Email = 'EMAIL',
  Github = 'GITHUB',
  Google = 'GOOGLE',
  Weibo = 'WEIBO'
}

export enum UserStatusType {
  Banned = 'BANNED',
  Suspended = 'SUSPENDED',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export type PictureFragmentFragment = (
  { __typename?: 'Picture', isLike?: boolean | null, likedCount?: number | null }
  & { ' $fragmentRefs'?: { 'PictureBaseFragmentFragment': PictureBaseFragmentFragment } }
) & { ' $fragmentName'?: 'PictureFragmentFragment' };

export type PictureBaseFragmentFragment = { __typename?: 'Picture', id: number, key?: string | null, hash?: string | null, title?: string | null, bio?: string | null, views?: number | null, originalname?: string | null, mimetype?: string | null, size?: number | null, color?: string | null, isDark?: boolean | null, height?: number | null, width?: number | null, make?: string | null, model?: string | null, createTime?: any | null, updateTime?: any | null, blurhash?: string | null } & { ' $fragmentName'?: 'PictureBaseFragmentFragment' };

export type PictureDetailFragmentFragment = (
  { __typename?: 'Picture', isPrivate?: boolean | null, commentCount?: number | null, currentCollections?: Array<(
    { __typename?: 'Collection' }
    & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
  ) | null> | null, user?: (
    { __typename?: 'User', isFollowing?: number | null }
    & { ' $fragmentRefs'?: { 'UserBaseFragmentFragment': UserBaseFragmentFragment } }
  ) | null, tags?: Array<(
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFragmentFragment': TagFragmentFragment } }
  ) | null> | null, exif?: (
    { __typename?: 'EXIF' }
    & { ' $fragmentRefs'?: { 'ExifFragmentFragment': ExifFragmentFragment } }
  ) | null, badge?: Array<(
    { __typename?: 'Badge' }
    & { ' $fragmentRefs'?: { 'BadgeFragmentFragment': BadgeFragmentFragment } }
  ) | null> | null, location?: (
    { __typename?: 'Location' }
    & { ' $fragmentRefs'?: { 'LocationFragmentFragment': LocationFragmentFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'PictureFragmentFragment': PictureFragmentFragment } }
) & { ' $fragmentName'?: 'PictureDetailFragmentFragment' };

export type PictureListItemFragmentFragment = (
  { __typename?: 'Picture', blurhash?: string | null, isPrivate?: boolean | null, badge?: Array<(
    { __typename?: 'Badge' }
    & { ' $fragmentRefs'?: { 'BadgeFragmentFragment': BadgeFragmentFragment } }
  ) | null> | null, user?: (
    { __typename?: 'User', badge?: Array<(
      { __typename?: 'Badge' }
      & { ' $fragmentRefs'?: { 'BadgeFragmentFragment': BadgeFragmentFragment } }
    ) | null> | null }
    & { ' $fragmentRefs'?: { 'UserBaseFragmentFragment': UserBaseFragmentFragment } }
  ) | null, exif?: (
    { __typename?: 'EXIF' }
    & { ' $fragmentRefs'?: { 'ExifFragmentFragment': ExifFragmentFragment } }
  ) | null, tags?: Array<(
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFragmentFragment': TagFragmentFragment } }
  ) | null> | null }
  & { ' $fragmentRefs'?: { 'PictureFragmentFragment': PictureFragmentFragment } }
) & { ' $fragmentName'?: 'PictureListItemFragmentFragment' };

export type PictureListFragmentFragment = { __typename?: 'Pictures', count?: number | null, page?: number | null, pageSize?: number | null, timestamp?: number | null, data: Array<(
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'PictureListItemFragmentFragment': PictureListItemFragmentFragment } }
  )> } & { ' $fragmentName'?: 'PictureListFragmentFragment' };

export type UpdatePictureFragmentFragment = { __typename?: 'Picture', title?: string | null, bio?: string | null, isPrivate?: boolean | null, location?: (
    { __typename?: 'Location' }
    & { ' $fragmentRefs'?: { 'LocationFragmentFragment': LocationFragmentFragment } }
  ) | null, tags?: Array<(
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFragmentFragment': TagFragmentFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'UpdatePictureFragmentFragment' };

export type PictureLikeFragmentFragment = { __typename?: 'LikePictureReq', count?: number | null, isLike?: boolean | null } & { ' $fragmentName'?: 'PictureLikeFragmentFragment' };

export type CollectionFragmentFragment = { __typename?: 'Collection', id: number, name?: string | null, bio?: string | null, isPrivate?: boolean | null, createTime?: any | null, updateTime?: any | null } & { ' $fragmentName'?: 'CollectionFragmentFragment' };

export type RelatedCollectionFragmentFragment = { __typename?: 'PictureRelatedCollectionReq', count?: number | null, data: Array<(
    { __typename?: 'Collection', preview?: Array<(
      { __typename?: 'Picture' }
      & { ' $fragmentRefs'?: { 'PictureBaseFragmentFragment': PictureBaseFragmentFragment } }
    )> | null }
    & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
  )> } & { ' $fragmentName'?: 'RelatedCollectionFragmentFragment' };

export type CollectionDetailFragmentFragment = (
  { __typename?: 'Collection', pictureCount?: number | null, user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null, preview?: Array<(
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'PictureBaseFragmentFragment': PictureBaseFragmentFragment } }
  )> | null }
  & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
) & { ' $fragmentName'?: 'CollectionDetailFragmentFragment' };

export type CollectionListFragmentFragment = { __typename?: 'Collections', count?: number | null, page?: number | null, pageSize?: number | null, data: Array<(
    { __typename?: 'Collection', pictureCount?: number | null, user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null, preview?: Array<(
      { __typename?: 'Picture' }
      & { ' $fragmentRefs'?: { 'PictureBaseFragmentFragment': PictureBaseFragmentFragment } }
    )> | null }
    & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
  )> } & { ' $fragmentName'?: 'CollectionListFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', id: number, username?: string | null, fullName?: string | null, name?: string | null, email?: string | null, avatar?: string | null, bio?: string | null, website?: string | null, createTime?: any | null, updateTime?: any | null, cover?: string | null, gender?: number | null, genderSecret?: boolean | null, birthday?: string | null, birthdayShow?: number | null } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type UserBaseFragmentFragment = (
  { __typename?: 'User', badge?: Array<(
    { __typename?: 'Badge' }
    & { ' $fragmentRefs'?: { 'BadgeFragmentFragment': BadgeFragmentFragment } }
  ) | null> | null }
  & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
) & { ' $fragmentName'?: 'UserBaseFragmentFragment' };

export type UserDetailFragmentFragment = (
  { __typename?: 'User', isOnline?: boolean | null, likedCount?: number | null, pictureCount?: number | null, isFollowing?: number | null, likesCount?: number | null, followerCount?: number | null, followedCount?: number | null, isEmailVerified?: boolean | null, isPassword?: boolean | null, signupType?: UserSignupType | null, status?: UserStatusType | null, pictures?: Array<(
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'PictureBaseFragmentFragment': PictureBaseFragmentFragment } }
  ) | null> | null, badge?: Array<(
    { __typename?: 'Badge' }
    & { ' $fragmentRefs'?: { 'BadgeFragmentFragment': BadgeFragmentFragment } }
  ) | null> | null }
  & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
) & { ' $fragmentName'?: 'UserDetailFragmentFragment' };

export type UserFollowInfoFragmentFragment = { __typename?: 'User', id: number, username?: string | null, isFollowing?: number | null, followerCount?: number | null, followedCount?: number | null } & { ' $fragmentName'?: 'UserFollowInfoFragmentFragment' };

export type TagFragmentFragment = { __typename?: 'Tag', id: number, name?: string | null, createTime?: any | null, updateTime?: any | null, pictureCount?: number | null } & { ' $fragmentName'?: 'TagFragmentFragment' };

export type ExifFragmentFragment = { __typename?: 'EXIF', aperture?: number | null, exposureTime?: string | null, focalLength?: number | null, ISO?: number | null, location?: Array<number | null> | null } & { ' $fragmentName'?: 'ExifFragmentFragment' };

export type NotificationFragmentFragment = { __typename?: 'Notification', id: number, createTime?: any | null, updateTime?: any | null, category?: NotificationCategory | null, read?: boolean | null, publisher?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null, picture?: (
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'PictureBaseFragmentFragment': PictureBaseFragmentFragment } }
  ) | null, comment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentNotificationFragmentFragment': CommentNotificationFragmentFragment } }
  ) | null, user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'NotificationFragmentFragment' };

export type CommentBaseFragmentFragment = { __typename?: 'Comment', id: number, content?: string | null, createTime?: any | null, updateTime?: any | null, subCount?: number | null } & { ' $fragmentName'?: 'CommentBaseFragmentFragment' };

export type CommentNotificationFragmentFragment = (
  { __typename?: 'Comment', replyComment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
  ) | null, parentComment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
  ) | null, user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null, replyUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null, picture?: (
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'PictureBaseFragmentFragment': PictureBaseFragmentFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
) & { ' $fragmentName'?: 'CommentNotificationFragmentFragment' };

export type CommentChildFragmentFragment = (
  { __typename?: 'Comment', replyComment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
  ) | null, parentComment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
  ) | null, user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserBaseFragmentFragment': UserBaseFragmentFragment } }
  ) | null, replyUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
) & { ' $fragmentName'?: 'CommentChildFragmentFragment' };

export type CommentFragmentFragment = (
  { __typename?: 'Comment', replyComment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
  ) | null, parentComment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
  ) | null, childComments?: Array<(
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentChildFragmentFragment': CommentChildFragmentFragment } }
  ) | null> | null, user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserBaseFragmentFragment': UserBaseFragmentFragment } }
  ) | null, replyUser?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null }
  & { ' $fragmentRefs'?: { 'CommentBaseFragmentFragment': CommentBaseFragmentFragment } }
) & { ' $fragmentName'?: 'CommentFragmentFragment' };

export type ChildCommentListFragmentFragment = { __typename?: 'Comments', count?: number | null, page?: number | null, pageSize?: number | null, timestamp?: number | null, data: Array<(
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentChildFragmentFragment': CommentChildFragmentFragment } }
  )> } & { ' $fragmentName'?: 'ChildCommentListFragmentFragment' };

export type CommentListFragmentFragment = { __typename?: 'Comments', count?: number | null, page?: number | null, pageSize?: number | null, timestamp?: number | null, data: Array<(
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentFragmentFragment': CommentFragmentFragment } }
  )> } & { ' $fragmentName'?: 'CommentListFragmentFragment' };

export type BadgeFragmentFragment = { __typename?: 'Badge', id?: number | null, type?: BadgeType | null, name?: string | null, rate?: string | null } & { ' $fragmentName'?: 'BadgeFragmentFragment' };

export type LocationFragmentFragment = { __typename?: 'Location', name?: string | null, address?: string | null, province?: string | null, city?: string | null, area?: string | null, street_id?: string | null, telephone?: string | null, uid?: string | null, location?: { __typename?: 'SearchPlaceDetailLocation', lat?: number | null, lng?: number | null } | null, detail?: (
    { __typename?: 'LocationDetail' }
    & { ' $fragmentRefs'?: { 'LocationDetailFragmentFragment': LocationDetailFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'LocationFragmentFragment' };

export type LocationDetailFragmentFragment = { __typename?: 'LocationDetail', tag?: string | null, shop_hours?: string | null, detail_url?: string | null, type?: string | null, overall_rating?: string | null, image_num?: string | null, comment_num?: string | null, scope_type?: string | null, content_tag?: string | null, navi_location?: { __typename?: 'SearchPlaceDetailLocation', lat?: number | null, lng?: number | null } | null } & { ' $fragmentName'?: 'LocationDetailFragmentFragment' };

export type AddCollectionMutationVariables = Exact<{
  data: AddCollectionInput;
}>;


export type AddCollectionMutation = { __typename?: 'Mutation', addCollection?: (
    { __typename?: 'Collection' }
    & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
  ) | null };

export type UpdatePictureMutationVariables = Exact<{
  data: UpdatePictureInput;
  id: Scalars['Float']['input'];
}>;


export type UpdatePictureMutation = { __typename?: 'Mutation', updatePicture?: (
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'UpdatePictureFragmentFragment': UpdatePictureFragmentFragment } }
  ) | null };

export type LikePictureMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type LikePictureMutation = { __typename?: 'Mutation', likePicture?: { __typename?: 'Picture', isLike?: boolean | null, likedCount?: number | null } | null };

export type UnLikePictureMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type UnLikePictureMutation = { __typename?: 'Mutation', unlikePicture?: { __typename?: 'Picture', isLike?: boolean | null, likedCount?: number | null } | null };

export type DeletePictureMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePictureMutation = { __typename?: 'Mutation', deletePicture?: { __typename?: 'Status', done?: boolean | null } | null };

export type MarkNotificationReadAllMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkNotificationReadAllMutation = { __typename?: 'Mutation', markNotificationReadAll?: { __typename?: 'Status', done?: boolean | null } | null };

export type AddPictureCollectionMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  pictureId: Scalars['Float']['input'];
}>;


export type AddPictureCollectionMutation = { __typename?: 'Mutation', addPictureCollection?: (
    { __typename?: 'Collection' }
    & { ' $fragmentRefs'?: { 'CollectionFragmentFragment': CollectionFragmentFragment } }
  ) | null };

export type RemovePictureCollectionMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  pictureId: Scalars['Float']['input'];
}>;


export type RemovePictureCollectionMutation = { __typename?: 'Mutation', removePictureCollection?: { __typename?: 'Status', done?: boolean | null } | null };

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection?: { __typename?: 'Status', done?: boolean | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null };

export type UpdateCoverMutationVariables = Exact<{
  cover: Scalars['String']['input'];
}>;


export type UpdateCoverMutation = { __typename?: 'Mutation', updateCover?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null };

export type FollowUserMutationVariables = Exact<{
  input: FollowUserInput;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser?: { __typename?: 'Status', done?: boolean | null } | null };

export type UnFollowUserMutationVariables = Exact<{
  input: FollowUserInput;
}>;


export type UnFollowUserMutation = { __typename?: 'Mutation', unFollowUser?: { __typename?: 'Status', done?: boolean | null } | null };

export type AddCommentMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  commentId?: InputMaybe<Scalars['Float']['input']>;
  data: AddCommentInput;
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment?: (
    { __typename?: 'Comment' }
    & { ' $fragmentRefs'?: { 'CommentChildFragmentFragment': CommentChildFragmentFragment } }
  ) | null };

export type PictureQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type PictureQuery = { __typename?: 'Query', picture?: (
    { __typename?: 'Picture' }
    & { ' $fragmentRefs'?: { 'PictureDetailFragmentFragment': PictureDetailFragmentFragment } }
  ) | null };

export type SearchPicturesQueryVariables = Exact<{
  words: Scalars['String']['input'];
  query: PicturesQueryInput;
}>;


export type SearchPicturesQuery = { __typename?: 'Query', searchPictures?: (
    { __typename?: 'Pictures' }
    & { ' $fragmentRefs'?: { 'PictureListFragmentFragment': PictureListFragmentFragment } }
  ) | null };

export type PicturesQueryVariables = Exact<{
  query: PicturesQueryInput;
  type?: InputMaybe<PicturesType>;
}>;


export type PicturesQuery = { __typename?: 'Query', pictures?: (
    { __typename?: 'Pictures' }
    & { ' $fragmentRefs'?: { 'PictureListFragmentFragment': PictureListFragmentFragment } }
  ) | null };

export type NewPicturesQueryVariables = Exact<{
  query: NewPicturesQueryInput;
}>;


export type NewPicturesQuery = { __typename?: 'Query', newPictures?: (
    { __typename?: 'Pictures' }
    & { ' $fragmentRefs'?: { 'PictureListFragmentFragment': PictureListFragmentFragment } }
  ) | null };

export type UserInfoQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserInfoQuery = { __typename?: 'Query', user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) | null };

export type UserIsFollowingQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserIsFollowingQuery = { __typename?: 'Query', user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFollowInfoFragmentFragment': UserFollowInfoFragmentFragment } }
  ) | null };

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = { __typename?: 'Query', whoami?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) | null };

export type UserPicturesQueryVariables = Exact<{
  type?: InputMaybe<UserPictureType>;
  username: Scalars['String']['input'];
  query: PicturesQueryInput;
}>;


export type UserPicturesQuery = { __typename?: 'Query', userPicturesByName?: (
    { __typename?: 'Pictures' }
    & { ' $fragmentRefs'?: { 'PictureListFragmentFragment': PictureListFragmentFragment } }
  ) | null };

export type UserCollectionsByNameQueryVariables = Exact<{
  username: Scalars['String']['input'];
  query?: InputMaybe<CollectionsQueryInput>;
}>;


export type UserCollectionsByNameQuery = { __typename?: 'Query', userCollectionsByName?: (
    { __typename?: 'Collections' }
    & { ' $fragmentRefs'?: { 'CollectionListFragmentFragment': CollectionListFragmentFragment } }
  ) | null };

export type PictureRelatedCollectionQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type PictureRelatedCollectionQuery = { __typename?: 'Query', pictureRelatedCollection?: (
    { __typename?: 'PictureRelatedCollectionReq' }
    & { ' $fragmentRefs'?: { 'RelatedCollectionFragmentFragment': RelatedCollectionFragmentFragment } }
  ) | null };

export type CollectionQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type CollectionQuery = { __typename?: 'Query', collection?: (
    { __typename?: 'Collection' }
    & { ' $fragmentRefs'?: { 'CollectionDetailFragmentFragment': CollectionDetailFragmentFragment } }
  ) | null };

export type CollectionPicturesQueryVariables = Exact<{
  id: Scalars['Float']['input'];
  query: PicturesQueryInput;
}>;


export type CollectionPicturesQuery = { __typename?: 'Query', collectionPictures?: (
    { __typename?: 'Pictures' }
    & { ' $fragmentRefs'?: { 'PictureListFragmentFragment': PictureListFragmentFragment } }
  ) | null };

export type TagQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type TagQuery = { __typename?: 'Query', tag?: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagFragmentFragment': TagFragmentFragment } }
  ) | null };

export type TagPicturesQueryVariables = Exact<{
  name: Scalars['String']['input'];
  query: PicturesQueryInput;
}>;


export type TagPicturesQuery = { __typename?: 'Query', tagPictures?: (
    { __typename?: 'Pictures' }
    & { ' $fragmentRefs'?: { 'PictureListFragmentFragment': PictureListFragmentFragment } }
  ) | null };

export type UserNotificationQueryVariables = Exact<{ [key: string]: never; }>;


export type UserNotificationQuery = { __typename?: 'Query', userNotification?: Array<(
    { __typename?: 'Notification' }
    & { ' $fragmentRefs'?: { 'NotificationFragmentFragment': NotificationFragmentFragment } }
  ) | null> | null };

export type UnreadNotificationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UnreadNotificationCountQuery = { __typename?: 'Query', unreadNotificationCount?: { __typename?: 'Count', count?: number | null } | null };

export type CommentsQueryVariables = Exact<{
  id: Scalars['Float']['input'];
  query?: InputMaybe<CommentsQueryInput>;
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type CommentsQuery = { __typename?: 'Query', comments?: (
    { __typename?: 'Comments' }
    & { ' $fragmentRefs'?: { 'CommentListFragmentFragment': CommentListFragmentFragment } }
  ) | null };

export type ChildCommentsQueryVariables = Exact<{
  id: Scalars['Float']['input'];
  query?: InputMaybe<CommentsQueryInput>;
}>;


export type ChildCommentsQuery = { __typename?: 'Query', childComments?: (
    { __typename?: 'Comments' }
    & { ' $fragmentRefs'?: { 'ChildCommentListFragmentFragment': ChildCommentListFragmentFragment } }
  ) | null };

export type FollowedUsersQueryVariables = Exact<{
  id: Scalars['Float']['input'];
  query: FollowUsersQueryInput;
}>;


export type FollowedUsersQuery = { __typename?: 'Query', followedUsers?: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) | null> | null };

export type FollowerUsersQueryVariables = Exact<{
  id: Scalars['Float']['input'];
  query: FollowUsersQueryInput;
}>;


export type FollowerUsersQuery = { __typename?: 'Query', followerUsers?: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) | null> | null };

export type ReverseGeocodingQueryVariables = Exact<{
  location: Scalars['String']['input'];
}>;


export type ReverseGeocodingQuery = { __typename?: 'Query', reverseGeocoding?: { __typename?: 'PictureLocation', pois?: Array<{ __typename?: 'Poi', name?: string | null } | null> | null } | null };

export type SearchPlaceQueryVariables = Exact<{
  value: Scalars['String']['input'];
  region: Scalars['String']['input'];
}>;


export type SearchPlaceQuery = { __typename?: 'Query', searchPlace?: Array<(
    { __typename?: 'Location' }
    & { ' $fragmentRefs'?: { 'LocationFragmentFragment': LocationFragmentFragment } }
  ) | null> | null };

export type PlaceSuggestionQueryVariables = Exact<{
  value: Scalars['String']['input'];
  region: Scalars['String']['input'];
}>;


export type PlaceSuggestionQuery = { __typename?: 'Query', placeSuggestion?: Array<(
    { __typename?: 'Location' }
    & { ' $fragmentRefs'?: { 'LocationFragmentFragment': LocationFragmentFragment } }
  ) | null> | null };

export type PlaceDetailQueryVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type PlaceDetailQuery = { __typename?: 'Query', placeDetail?: (
    { __typename?: 'Location' }
    & { ' $fragmentRefs'?: { 'LocationFragmentFragment': LocationFragmentFragment } }
  ) | null };

export type NewNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewNotificationSubscription = { __typename?: 'Subscription', newNotification?: (
    { __typename?: 'Notification' }
    & { ' $fragmentRefs'?: { 'NotificationFragmentFragment': NotificationFragmentFragment } }
  ) | null };

export type UserOnlineStatusSubscriptionVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type UserOnlineStatusSubscription = { __typename?: 'Subscription', userOnlineStatus?: { __typename?: 'UserOnlineStatus', online: boolean } | null };

export const PictureBaseFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]} as unknown as DocumentNode<PictureBaseFragmentFragment, unknown>;
export const PictureFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]} as unknown as DocumentNode<PictureFragmentFragment, unknown>;
export const CollectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}}]} as unknown as DocumentNode<CollectionFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const BadgeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]} as unknown as DocumentNode<BadgeFragmentFragment, unknown>;
export const UserBaseFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]} as unknown as DocumentNode<UserBaseFragmentFragment, unknown>;
export const TagFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}}]} as unknown as DocumentNode<TagFragmentFragment, unknown>;
export const ExifFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}}]} as unknown as DocumentNode<ExifFragmentFragment, unknown>;
export const LocationDetailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}}]} as unknown as DocumentNode<LocationDetailFragmentFragment, unknown>;
export const LocationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}}]} as unknown as DocumentNode<LocationFragmentFragment, unknown>;
export const PictureDetailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}}]} as unknown as DocumentNode<PictureDetailFragmentFragment, unknown>;
export const PictureListItemFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}}]} as unknown as DocumentNode<PictureListItemFragmentFragment, unknown>;
export const PictureListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pictures"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListItemFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}}]} as unknown as DocumentNode<PictureListFragmentFragment, unknown>;
export const UpdatePictureFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpdatePictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}}]} as unknown as DocumentNode<UpdatePictureFragmentFragment, unknown>;
export const PictureLikeFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureLikeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LikePictureReq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}}]}}]} as unknown as DocumentNode<PictureLikeFragmentFragment, unknown>;
export const RelatedCollectionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RelatedCollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureRelatedCollectionReq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]} as unknown as DocumentNode<RelatedCollectionFragmentFragment, unknown>;
export const CollectionDetailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]} as unknown as DocumentNode<CollectionDetailFragmentFragment, unknown>;
export const CollectionListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collections"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]} as unknown as DocumentNode<CollectionListFragmentFragment, unknown>;
export const UserFollowInfoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFollowInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}}]}}]} as unknown as DocumentNode<UserFollowInfoFragmentFragment, unknown>;
export const CommentBaseFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}}]} as unknown as DocumentNode<CommentBaseFragmentFragment, unknown>;
export const CommentNotificationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentNotificationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}}]} as unknown as DocumentNode<CommentNotificationFragmentFragment, unknown>;
export const UserDetailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}}]} as unknown as DocumentNode<UserDetailFragmentFragment, unknown>;
export const NotificationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentNotificationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentNotificationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}}]} as unknown as DocumentNode<NotificationFragmentFragment, unknown>;
export const CommentChildFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentChildFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}}]} as unknown as DocumentNode<CommentChildFragmentFragment, unknown>;
export const ChildCommentListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChildCommentListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comments"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentChildFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentChildFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]} as unknown as DocumentNode<ChildCommentListFragmentFragment, unknown>;
export const CommentFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentChildFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentChildFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]} as unknown as DocumentNode<CommentFragmentFragment, unknown>;
export const CommentListFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comments"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentChildFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentChildFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]} as unknown as DocumentNode<CommentListFragmentFragment, unknown>;
export const AddCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCollectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}}]} as unknown as DocumentNode<AddCollectionMutation, AddCollectionMutationVariables>;
export const UpdatePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePictureInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UpdatePictureFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UpdatePictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}}]} as unknown as DocumentNode<UpdatePictureMutation, UpdatePictureMutationVariables>;
export const LikePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}}]}}]} as unknown as DocumentNode<LikePictureMutation, LikePictureMutationVariables>;
export const UnLikePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnLikePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlikePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}}]}}]} as unknown as DocumentNode<UnLikePictureMutation, UnLikePictureMutationVariables>;
export const DeletePictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePicture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePicture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]} as unknown as DocumentNode<DeletePictureMutation, DeletePictureMutationVariables>;
export const MarkNotificationReadAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkNotificationReadAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationReadAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]} as unknown as DocumentNode<MarkNotificationReadAllMutation, MarkNotificationReadAllMutationVariables>;
export const AddPictureCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPictureCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pictureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPictureCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pictureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pictureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}}]} as unknown as DocumentNode<AddPictureCollectionMutation, AddPictureCollectionMutationVariables>;
export const RemovePictureCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemovePictureCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pictureId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removePictureCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pictureId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pictureId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]} as unknown as DocumentNode<RemovePictureCollectionMutation, RemovePictureCollectionMutationVariables>;
export const DeleteCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]} as unknown as DocumentNode<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const UpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}}]} as unknown as DocumentNode<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const UpdateCoverDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCover"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cover"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCover"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cover"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cover"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}}]} as unknown as DocumentNode<UpdateCoverMutation, UpdateCoverMutationVariables>;
export const FollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]} as unknown as DocumentNode<FollowUserMutation, FollowUserMutationVariables>;
export const UnFollowUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnFollowUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unFollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"done"}}]}}]}}]} as unknown as DocumentNode<UnFollowUserMutation, UnFollowUserMutationVariables>;
export const AddCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentChildFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentChildFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]} as unknown as DocumentNode<AddCommentMutation, AddCommentMutationVariables>;
export const PictureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Picture"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"picture"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentCollections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFragment"}}]}}]}}]} as unknown as DocumentNode<PictureQuery, PictureQueryVariables>;
export const SearchPicturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchPictures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"words"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PicturesQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchPictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"words"},"value":{"kind":"Variable","name":{"kind":"Name","value":"words"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pictures"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListItemFragment"}}]}}]}}]} as unknown as DocumentNode<SearchPicturesQuery, SearchPicturesQueryVariables>;
export const PicturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Pictures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PicturesQueryInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PicturesType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pictures"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListItemFragment"}}]}}]}}]} as unknown as DocumentNode<PicturesQuery, PicturesQueryVariables>;
export const NewPicturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NewPictures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewPicturesQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newPictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pictures"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListItemFragment"}}]}}]}}]} as unknown as DocumentNode<NewPicturesQuery, NewPicturesQueryVariables>;
export const UserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}}]} as unknown as DocumentNode<UserInfoQuery, UserInfoQueryVariables>;
export const UserIsFollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserIsFollowing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFollowInfoFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFollowInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}}]}}]} as unknown as DocumentNode<UserIsFollowingQuery, UserIsFollowingQueryVariables>;
export const WhoamiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Whoami"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoami"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}}]} as unknown as DocumentNode<WhoamiQuery, WhoamiQueryVariables>;
export const UserPicturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPictures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserPictureType"}},"defaultValue":{"kind":"EnumValue","value":"MY"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PicturesQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userPicturesByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pictures"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListItemFragment"}}]}}]}}]} as unknown as DocumentNode<UserPicturesQuery, UserPicturesQueryVariables>;
export const UserCollectionsByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserCollectionsByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CollectionsQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCollectionsByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collections"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}}]}}]} as unknown as DocumentNode<UserCollectionsByNameQuery, UserCollectionsByNameQueryVariables>;
export const PictureRelatedCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PictureRelatedCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pictureRelatedCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RelatedCollectionFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RelatedCollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PictureRelatedCollectionReq"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}}]}}]} as unknown as DocumentNode<PictureRelatedCollectionQuery, PictureRelatedCollectionQueryVariables>;
export const CollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Collection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionFragment"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}}]} as unknown as DocumentNode<CollectionQuery, CollectionQueryVariables>;
export const CollectionPicturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CollectionPictures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PicturesQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collectionPictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pictures"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListItemFragment"}}]}}]}}]} as unknown as DocumentNode<CollectionPicturesQuery, CollectionPicturesQueryVariables>;
export const TagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}}]} as unknown as DocumentNode<TagQuery, TagQueryVariables>;
export const TagPicturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TagPictures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PicturesQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tagPictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isLike"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EXIFFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EXIF"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aperture"}},{"kind":"Field","name":{"kind":"Name","value":"exposureTime"}},{"kind":"Field","name":{"kind":"Name","value":"focalLength"}},{"kind":"Field","name":{"kind":"Name","value":"ISO"}},{"kind":"Field","name":{"kind":"Name","value":"location"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListItemFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exif"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EXIFFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pictures"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureListItemFragment"}}]}}]}}]} as unknown as DocumentNode<TagPicturesQuery, TagPicturesQueryVariables>;
export const UserNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentNotificationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentNotificationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}}]} as unknown as DocumentNode<UserNotificationQuery, UserNotificationQueryVariables>;
export const UnreadNotificationCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UnreadNotificationCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unreadNotificationCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>;
export const CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Comments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentsQueryInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentChildFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentChildFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comments"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentFragment"}}]}}]}}]} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const ChildCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChildComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CommentsQueryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"childComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChildCommentListFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentChildFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChildCommentListFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comments"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentChildFragment"}}]}}]}}]} as unknown as DocumentNode<ChildCommentsQuery, ChildCommentsQueryVariables>;
export const FollowedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FollowedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowUsersQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}}]} as unknown as DocumentNode<FollowedUsersQuery, FollowedUsersQueryVariables>;
export const FollowerUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FollowerUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowUsersQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followerUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}}]} as unknown as DocumentNode<FollowerUsersQuery, FollowerUsersQueryVariables>;
export const ReverseGeocodingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ReverseGeocoding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reverseGeocoding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pois"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ReverseGeocodingQuery, ReverseGeocodingQueryVariables>;
export const SearchPlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchPlace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchPlace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}}]} as unknown as DocumentNode<SearchPlaceQuery, SearchPlaceQueryVariables>;
export const PlaceSuggestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaceSuggestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeSuggestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}},{"kind":"Argument","name":{"kind":"Name","value":"region"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}}]} as unknown as DocumentNode<PlaceSuggestionQuery, PlaceSuggestionQueryVariables>;
export const PlaceDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaceDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"placeDetail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"navi_location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shop_hours"}},{"kind":"Field","name":{"kind":"Name","value":"detail_url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"overall_rating"}},{"kind":"Field","name":{"kind":"Name","value":"image_num"}},{"kind":"Field","name":{"kind":"Name","value":"comment_num"}},{"kind":"Field","name":{"kind":"Name","value":"scope_type"}},{"kind":"Field","name":{"kind":"Name","value":"content_tag"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Location"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"area"}},{"kind":"Field","name":{"kind":"Name","value":"street_id"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"detail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationDetailFragment"}}]}}]}}]} as unknown as DocumentNode<PlaceDetailQuery, PlaceDetailQueryVariables>;
export const NewNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newNotification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotificationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"cover"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"genderSecret"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthdayShow"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PictureBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Picture"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"originalname"}},{"kind":"Field","name":{"kind":"Name","value":"mimetype"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"isDark"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"make"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"blurhash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentBaseFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"subCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommentNotificationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}},{"kind":"Field","name":{"kind":"Name","value":"replyComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"parentComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"replyUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BadgeFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Badge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"Field","name":{"kind":"Name","value":"isOnline"}},{"kind":"Field","name":{"kind":"Name","value":"likedCount"}},{"kind":"Field","name":{"kind":"Name","value":"pictureCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followedCount"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isPassword"}},{"kind":"Field","name":{"kind":"Name","value":"signupType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pictures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"badge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BadgeFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotificationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Notification"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createTime"}},{"kind":"Field","name":{"kind":"Name","value":"updateTime"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"read"}},{"kind":"Field","name":{"kind":"Name","value":"picture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PictureBaseFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommentNotificationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}}]} as unknown as DocumentNode<NewNotificationSubscription, NewNotificationSubscriptionVariables>;
export const UserOnlineStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"UserOnlineStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userOnlineStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"online"}}]}}]}}]} as unknown as DocumentNode<UserOnlineStatusSubscription, UserOnlineStatusSubscriptionVariables>;