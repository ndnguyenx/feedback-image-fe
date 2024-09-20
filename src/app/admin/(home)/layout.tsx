'use client'
import Navbar from "@/components/navbar-admin/navbar";
import "./style.scss";
import { Content } from "antd/es/layout/layout";
import Sidebar from "@/components/sidebar-admin/sidebar";
import { useState } from "react";
// import FooterLayout from "@/layouts/public/footer/FooterLayout";

export default function AdminHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleCollapseChange = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="layout-main">
      <Sidebar  onCollapseChange={handleCollapseChange} />
      <Navbar />
      <div className="main-navbar">
        <Content className={`content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>{children}</Content>
      </div>
    </div>
  );
}
