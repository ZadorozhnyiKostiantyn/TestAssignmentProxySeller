export type UserType = {
  id: number;
  name: string;
  username: string;
};

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type AlbumType = {
  userId: number;
  id: number;
  title: string;
};

export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type Order = "asc" | "desc";
