import React from "react";
import { UserType } from "../../../types";
import { Flex, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchPostsByUserId } from "../../../api/api";
import { useParams } from "react-router-dom";
import Head from "../../../components/Head";
import styles from "./styles.module.less";
import { QUERY_KEY } from "../../../constants";
import Post from "./Post";

interface PostGroupProps {
  user?: UserType;
  isLoading?: boolean;
}

const PostGroup = ({ user, isLoading }: PostGroupProps) => {
  const { userId } = useParams();

  const { data: posts, isLoading: isPostLoading } = useQuery({
    queryKey: [QUERY_KEY.posts, userId],
    queryFn: async () => await fetchPostsByUserId(Number(userId)),
  });

  return (
    <>
      <Head title={`${user?.username} - Posts`} />
      <Spin
        spinning={isLoading || isPostLoading}
        className={styles.postGroupSpin}
      >
        <Flex gap={"small"} className={styles.postGroup} vertical>
          {posts?.map((post) => (
            <Post key={post.id} post={post} user={user} />
          ))}
        </Flex>
      </Spin>
    </>
  );
};

export default PostGroup;
