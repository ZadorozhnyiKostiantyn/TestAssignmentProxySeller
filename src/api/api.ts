import { AlbumType, PhotoType, PostType, UserType } from "../types";

export const fetchUsers = async (search?: string): Promise<UserType[]> => {
  return await fetch(`https://jsonplaceholder.typicode.com/users?${search}`).then((res) => res.json());
};

export const fetchUserById = async (userId: number): Promise<UserType> => {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/`).then((res) => res.json());
};

export const fetchPostsByUserId = async (userId: number): Promise<PostType[]> => {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`).then((res) => res.json());
};

export const fetchAlbumsByUserId = async (userId: number): Promise<AlbumType[]> => {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`).then((res) => res.json());
};

export const fetchPhotosByUserId = async (userId: number): Promise<PhotoType[]> => {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/photos`).then((res) => res.json());
};

export const fetchPhotosByAlbumId = async (albumId: number): Promise<PhotoType[]> => {
  return await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`).then((res) => res.json());
};
