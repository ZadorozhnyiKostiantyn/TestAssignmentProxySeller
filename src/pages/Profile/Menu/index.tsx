import { useNavigate } from "react-router-dom";
import { Menu as MenuAntDesign, MenuProps } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import React from "react";


const menuItems: MenuProps["items"] = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: <HomeOutlined />,
    style: {
      padding: 0,
    },
  },
];

const Menu = () => {
  const navigate = useNavigate();
  const handleMenuClick: MenuProps["onClick"] = () => {
    navigate("/");
  };
  return (
    <MenuAntDesign
      onClick={handleMenuClick}
      mode="horizontal"
      items={menuItems}
    />
  );
};

export default Menu;
