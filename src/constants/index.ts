import { Order } from "../types";

export const SORT_DIRECTION: Record<Order, Order> = {
  asc: "asc",
  desc: "desc",
}

export const SEARCH_PARAMS = {
  albumId: "albumId",
  photoId: "photoId",
  postId: "postId",
  search: "search",
  order: "order",
} as const;

export const QUERY_KEY = {
  albums: "albums",
  photos: "photos",
  users: "users",
  posts: "posts",
} as const;