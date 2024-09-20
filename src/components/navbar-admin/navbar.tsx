"use client";

import "./navbar.scss";
import React, { useState } from "react";
import Link from "next/link";
import { Avatar, Divider, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/">Thông tin cá nhân</Link>,
    icon: <FaUser />,
  },
  {
    key: "2",
    label: <Link href="/">Cài đặt</Link>,
    icon: <IoSettingsSharp />,
  },
  {
    key: "3",
    label: <Link href="/">Hoạt động đăng nhập</Link>,
    icon: <AiOutlineBars />,
  },
  {
    type: "divider",
  },
  {
    key: "4",
    label: <Link href="/">Đăng xuất</Link>,
    icon: <IoIosLogOut />,
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="icon-icon">
        <AiOutlineBars />
      </div>
      <div className="navbar-main">
        <Divider type="vertical" className="navbar-divider" />
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          open={isMenuOpen}
          onOpenChange={toggleMenu}
        >
          <Avatar size={40} icon={<UserOutlined />} className="navbar-avatar" />
        </Dropdown>
      </div>
    </nav>
  );
}
