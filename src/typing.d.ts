type Maybe<T> = T | null;

type IListQueryResult<T> = {
  count: number;
  data: T[];
  page: number;
  pageSize: number;
  timestamp: number;
};

declare module '*/fragments.graphql';
declare module '*/mutations.graphql';
declare module '*/subscription.graphql';
declare module '@app/graphql/query/query.graphql' {
  import { DocumentNode, DocumentNode, DocumentNode } from 'graphql';

  export const Picture: DocumentNode;
  export const Pictures: DocumentNode;
  export const NewPictures: DocumentNode;
  export const UserInfo: DocumentNode;
  export const UserPictures: DocumentNode;
  export const UserCollectionsByName: DocumentNode;
  export const UpdatePicture: DocumentNode;
  export const Whoami: DocumentNode;
  export const Collection: DocumentNode;
  export const CollectionPictures: DocumentNode;
  export const Tag: DocumentNode;
  export const TagPictures: DocumentNode;
  export const UserNotification: DocumentNode;
  export const UnreadNotificationCount: DocumentNode;
  export const Comments: DocumentNode;
  export const ChildComments: DocumentNode;
  export const UserIsFollowing: DocumentNode;
  export const SearchPictures: DocumentNode;
  export const FollowedUsers: DocumentNode;
  export const FollowerUsers: DocumentNode;
  export const ReverseGeocoding: DocumentNode;
  export const SearchPlace: DocumentNode;
  export const PictureRelatedCollection: DocumentNode;
  export const PlaceSuggestion: DocumentNode;
  export const PlaceDetail: DocumentNode;
}

declare module '@app/graphql/mutations/mutations.graphql' {

  export const UpdatePicture: DocumentNode;
  export const LikePicture: DocumentNode;
  export const UnLikePicture: DocumentNode;
  export const MarkNotificationReadAll: DocumentNode;
  export const DeletePicture: DocumentNode;
  export const AddPictureCollection: DocumentNode;
  export const RemovePictureCollection: DocumentNode;
  export const DeleteCollection: DocumentNode;
  export const UpdateProfile: DocumentNode;
  export const UpdateCover: DocumentNode;
  export const AddComment: DocumentNode;
  export const FollowUser: DocumentNode;
  export const UnFollowUser: DocumentNode;
}

declare module '@app/graphql/subscription/subscription.graphql' {

  export const NewNotification: DocumentNode;
}
