import { Avatar, Card } from "antd";
import React from "react";
import { CSSProperties } from "react";
import styles from "./styles.module.less"

const { Meta } = Card;

interface UserProfileProps {
  src?: string;
  name?: string;
  username?: string;
  avatarStyle?: CSSProperties;
  style?: CSSProperties;
  avatarClassName?: string;
}

const UserProfile = ({
  src = "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
  name,
  username,
  avatarStyle,
  style,
  avatarClassName,
}: UserProfileProps) => {
  return (
    <Meta style={style}
      avatar={
        <Avatar style={avatarStyle} className={`${styles.avatar} ${avatarClassName}`} src={src} />
      }
      title={name}
      description={`@${username}`}
    />
  );
};

export default UserProfile;
