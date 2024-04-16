import { Card, Modal } from "antd";
import React, { useState } from "react";
import UserProfile from "../../../../components/UserProfile";
import { PostType, UserType } from "../../../../types";
import * as styles from "./styles.module.less";
import { useSearchParams } from "react-router-dom";
import { SEARCH_PARAMS } from "../../../../constants";

interface PostProps {
  post: PostType;
  user?: UserType;
}

const Post = ({ post, user }: PostProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(
    Number(searchParams.get(SEARCH_PARAMS.postId)) === post.id
  );

  const handleOpen = () => {
    setSearchParams({
      [SEARCH_PARAMS.postId]: post.id.toString(),
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchParams({});
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={handleClose}
        className={styles.modal}
        footer={null}
        width={"80%"}
        centered
      >
        <Card key={post.id} className={styles.modalContent}>
          <UserProfile username={user?.username} name={user?.name} />
          <Card className={styles.postData}>
            <Card.Meta title={post.title} description={post.body} />
          </Card>
        </Card>
      </Modal>
      <Card
        key={post.id}
        hoverable
        className={styles.posts}
        onClick={handleOpen}
      >
        <UserProfile username={user?.username} name={user?.name} />
        <Card className={styles.postData}>
          <Card.Meta title={post.title} description={post.body} />
        </Card>
      </Card>
    </>
  );
};

export default Post;
