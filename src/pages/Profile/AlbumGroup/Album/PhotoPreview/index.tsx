import { Card } from "antd";
import React from "react";
import UserProfile from "../../../../../components/UserProfile";
import { UserType } from "../../../../../types";
import styles from "./styles.module.less";

interface PhotoPreviewProps {
  originalNode: React.ReactElement;
  user?: UserType;
  title: string;
  description: string;
}

const PhotoPreview = ({
  originalNode,
  user,
  title,
  description,
}: PhotoPreviewProps) => {
  return (
    <div className={styles.imagePreview}>
      <img
        src={originalNode.props.src}
        alt={originalNode.props.alt}
        style={{
          ...originalNode.props.style,
          height: "100%",
          width: "100%",
        }}
      />
      <Card
        className={styles.imagePreviewDetails}
      >
        <UserProfile
          style={{
            textAlign: "start",
          }}
          username={user?.username}
          name={user?.name}
        />
        <Card className={styles.cardContent}>
          <Card.Meta
            title={title}
            description={description}
          />
        </Card>
      </Card>
    </div>
  );
};

export default PhotoPreview;
