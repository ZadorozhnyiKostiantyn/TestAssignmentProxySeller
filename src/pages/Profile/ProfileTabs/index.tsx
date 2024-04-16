import { Tabs, TabsProps } from "antd";
import React from "react";
import { QUERY_KEY } from "../../../constants";
import AlbumGroup from "../AlbumGroup";
import PostGroup from "../PostGroup";
import { UserType } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import * as styles from "../styles.module.less";

interface ProfileTabsProps {
  user?: UserType;
  isUserLoading: boolean;
}

const ProfileTabs = ({user, isUserLoading}: ProfileTabsProps) => {
  const { userId, query } = useParams();
  const navigate = useNavigate();

  const items: TabsProps["items"] = [
    {
      key: QUERY_KEY.posts,
      label: "Posts",
      children: <PostGroup user={user} isLoading={isUserLoading} />,
    },
    {
      key: QUERY_KEY.albums,
      label: "Albums",
      children: <AlbumGroup user={user} isLoading={isUserLoading} />,
    },
  ];

  const handleChangeTab = (activeKey: string) => {
    navigate(`/profile/${Number(userId)}/${activeKey}`);
  };
  return (
    <Tabs
      onChange={handleChangeTab}
      items={items}
      className={styles.wrapper}
      tabBarStyle={{
        borderBottom: "1px solid #c1bdbd",
      }}
      size={"large"}
      defaultActiveKey={query}
    />
  );
};

export default ProfileTabs;
