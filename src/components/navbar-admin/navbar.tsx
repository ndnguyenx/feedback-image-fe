"use client";

import "./navbar.scss";
import React, { useState } from "react";
import { Avatar, Divider, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlineBars } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { logout } from "@/apis/auth/auth.apis";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlerLogout = async () => {
    const results = await logout();
    if (results.error) {
      toast.error(results.message);
    } else {
      toast.success(results.message);
      router.replace('/login', { scroll: true });
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={handlerLogout}>Đăng xuất</span>,
      icon: <IoIosLogOut />,
    },
  ];

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
          <Avatar 
            size={40} 
            src="https://avatar.iran.liara.run/public" 
            className="navbar-avatar" 
            icon={<UserOutlined />} 
          />
        </Dropdown>
      </div>
    </nav>
  );
}
