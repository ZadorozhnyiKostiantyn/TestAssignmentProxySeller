import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/api";
import { useMemo, useState } from "react";
import { Order } from "../../types";
import { Button, Flex, Input, Space, Spin, Typography } from "antd";
import {
  SortDescendingOutlined,
  SortAscendingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ListUsers from "./components/ListUsers";
import { useSearchParams } from "react-router-dom";
import { sortUsersByUsername } from "../../utils/utils";
import Head from "../../components/Head";
import { QUERY_KEY, SEARCH_PARAMS, SORT_DIRECTION } from "../../constants";
import * as styles from "./styles.module.less";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get(SEARCH_PARAMS.search) || ""
  );
  const [sortDirection, setSortDirection] = useState<Order | null>(
    searchParams.get(SEARCH_PARAMS.order) as Order | null
  );

  const { data: users, isLoading } = useQuery({
    queryKey: [QUERY_KEY.users, searchQuery],
    queryFn: async () => fetchUsers(`username_like=${searchQuery}`),
  });

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];

    return sortUsersByUsername(users || [], sortDirection);
  }, [users, searchQuery, sortDirection]);

  const handleRequestSort = () => {
    if (sortDirection === SORT_DIRECTION.desc) {
      setSortDirection(null);
      setSearchParams({
        [SEARCH_PARAMS.search]: searchQuery,
      });
      return;
    }

    const order: Order =
      sortDirection === null ? SORT_DIRECTION.asc : SORT_DIRECTION.desc;

    setSortDirection(order);

    setSearchParams({
      [SEARCH_PARAMS.search]: searchQuery,
      [SEARCH_PARAMS.order]: order,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setSearchParams({
      [SEARCH_PARAMS.order]: sortDirection || "",
      [SEARCH_PARAMS.search]: event.target.value,
    });
  };

  return (
    <>
      <Head title="Dashboard" />
      <Flex gap="small" align="center" justify="center" vertical>
        <Flex className={styles.gridHeader}>
          <Typography.Title className={styles.title}>Users</Typography.Title>
          <Space
            direction="horizontal"
            align="center"
            className={styles.filters}
          >
            <Input
              className={styles.searchBar}
              size={"large"}
              prefix={<SearchOutlined />}
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <Button
              size="large"
              onClick={handleRequestSort}
              style={
                sortDirection
                  ? {
                      color: "#0958d9",
                      borderColor: "#0958d9",
                    }
                  : {}
              }
              icon={
                sortDirection === SORT_DIRECTION.asc ? (
                  <SortAscendingOutlined />
                ) : (
                  <SortDescendingOutlined />
                )
              }
            />
          </Space>
        </Flex>
        <Spin spinning={isLoading} className={styles.spin}>
          <div className={styles.listUsers}>
            <ListUsers data={filteredUsers}/>
          </div>
        </Spin>
      </Flex>
    </>
  );
}
