import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../api/api";
import React from "react";
import { Card, Col, Layout, Row } from "antd";
import Head from "../../components/Head";
import styles from "./styles.module.less";
import "./styles.module.less";
import UserProfile from "../../components/UserProfile";
import { QUERY_KEY } from "../../constants";
import Menu from "./Menu";
import ProfileTabs from "./ProfileTabs";

const { Header, Content } = Layout;

const Profile = () => {
  const { userId } = useParams();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: [QUERY_KEY.users, userId],
    queryFn: async () => await fetchUserById(Number(userId)),
  });

  return (
    <Layout>
      <Header className={styles.wrapper}>
        <Head title={`${user?.username}`} />
        <Menu />
      </Header>
      <Content>
        <Row
          gutter={16}
          justify="center"
          align="top"
          className={styles.wrapper}
        >
          <Col flex={"auto"}>
            <Card
              loading={isUserLoading}
              className={styles.profile}
              cover={
                <img
                  alt=""
                  src="https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg"
                  height={200}
                />
              }
            >
              <UserProfile
                username={user?.username}
                name={user?.name}
                avatarClassName={styles.avatarImage}
              />
            </Card>
            <Col flex={"auto"}>
              <ProfileTabs user={user} isUserLoading={isUserLoading} />
            </Col>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Profile;
