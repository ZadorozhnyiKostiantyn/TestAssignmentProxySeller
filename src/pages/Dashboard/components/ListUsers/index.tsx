import { Card } from "antd";
import { UserType } from "../../../../types";
import React from "react";
import { Link } from "react-router-dom";
import { IdcardOutlined, SaveOutlined } from "@ant-design/icons";
import UserProfile from "../../../../components/UserProfile";

import * as styles from "./styles.module.less";

interface ListUsersProps {
  data: UserType[];
}

const ListUsers = ({ data }: ListUsersProps) => {
  return (
      data?.map((user) => {
        return (
          <Card
            key={user.id}
            hoverable
            className={styles.user}
            actions={[
              <Link to={`profile/${user.id}/posts`}>
                Posts <IdcardOutlined key={"posts"} />
              </Link>,
              <Link to={`profile/${user.id}/albums`}>
                Albums <SaveOutlined key={"albums"} />
              </Link>,
            ]}
          >
            <Link to={`profile/${user.id}/posts`}>
              <UserProfile
                username={user.username}
                name={user.name}
              />
            </Link>
          </Card>
        );
      })
  );
};

export default ListUsers;
