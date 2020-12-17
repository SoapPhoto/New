declare module '*/fragments.graphql';

declare module '@app/graphql/query/query.graphql' {
  import { DocumentNode } from 'graphql';

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
}
