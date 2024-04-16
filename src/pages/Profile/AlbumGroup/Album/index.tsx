import React, { useMemo } from "react";
import { AlbumType, PhotoType, UserType } from "../../../../types";
import { Image } from "antd";
import "./styles.less";
import { useSearchParams } from "react-router-dom";
import PhotoPreview from "./PhotoPreview";
import { SEARCH_PARAMS } from "../../../../constants";

interface AlbumProps {
  user?: UserType;
  album: AlbumType;
  photos: PhotoType[];
}

const Album = ({ album, photos, user }: AlbumProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const visible = album.id === Number(searchParams.get(SEARCH_PARAMS.albumId));

  const photosUrl = useMemo(() => {
    return photos?.map((photo) => photo.url);
  }, [photos]);

  if (photos.length < 0 || !photos[0]) {
    return;
  }

  const handleClick = () => {
    setSearchParams({
      [SEARCH_PARAMS.albumId]: album.id.toString(),
    });
  };

  const handleImageChange = (currentImage: number) => {
    setSearchParams({
      [SEARCH_PARAMS.albumId]: album.id.toString(),
      [SEARCH_PARAMS.photoId]: currentImage.toString(),
    });
  };

  const handleVisibleChange = (value: boolean) => {
    if (!value) {
      setSearchParams((params) => {
        params.delete(SEARCH_PARAMS.albumId);
        return params;
      });
    }
  };

  const imageRender = (
    originalNode: React.ReactElement,
    info: {
      current: number;
    }
  ) => {
    return (
      <PhotoPreview
        originalNode={originalNode}
        user={user}
        title={album.title}
        description={photos[info.current].title}
      />
    );
  };

  return (
    <Image.PreviewGroup
      items={photosUrl}
      preview={{
        onVisibleChange: handleVisibleChange,
        onChange: handleImageChange,
        imageRender: imageRender,
        visible: visible,
        current: Number(searchParams.get("photoId")) || 0,
      }}
    >
      <Image src={photos[0].url} onClick={handleClick} />
    </Image.PreviewGroup>
  );
};

export default Album;
