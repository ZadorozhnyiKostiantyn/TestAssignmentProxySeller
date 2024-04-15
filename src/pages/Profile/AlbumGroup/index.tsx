import { Spin, Col, Row } from "antd";
import React from "react";
import { UserType } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { fetchAlbumsByUserId, fetchPhotosByUserId } from "../../../api/api";
import { useParams } from "react-router-dom";
import Album from "./Album";
import Head from "../../../components/Head";
import { QUERY_KEY } from "../../../constants";

interface AlbumGroupProps {
  user?: UserType;
  isLoading?: boolean;
}

const AlbumGroup = ({ user, isLoading }: AlbumGroupProps) => {
  const { userId } = useParams();

  const { data: albums, isLoading: isAlbumsLoading } = useQuery({
    queryKey: [QUERY_KEY.albums, userId],
    queryFn: async () => await fetchAlbumsByUserId(Number(userId)),
  });

  const { data: photos, isLoading: isPhotosLoading } = useQuery({
    queryKey: [QUERY_KEY.photos, userId],
    queryFn: async () => await fetchPhotosByUserId(Number(userId)),
  });

  return (
    <>
      <Head title={`${user?.username} - Albums`} />
      <Spin spinning={isAlbumsLoading || isPhotosLoading || isLoading}>
        <Row
          gutter={[5, 5]}
        >
          {albums?.map((album) => (
            <Col span={8} key={album.id}>
              <Album
                user={user}
                album={album}
                photos={
                  photos?.filter((photo) => photo.albumId === album.id) || []
                }
              />
            </Col>
          ))}
        </Row>
      </Spin>
    </>
  );
};

export default AlbumGroup;
