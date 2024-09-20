'use client';

import "./sidebar.scss";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import { FaImages } from "react-icons/fa6";
import { AiOutlineBars } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

interface SidebarProps {
  onCollapseChange: (collapsed: boolean) => void;
}


export default function Sidebar({ onCollapseChange }: SidebarProps) {
  const pathname = usePathname();
  const [isNavHiddenShown, setIsNavHiddenShown] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavHidden = () => {
    setIsNavHiddenShown(!isNavHiddenShown);
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const newCollapseState = !prev;
      onCollapseChange(newCollapseState); 
      return newCollapseState;
    });
  };

  const closeNavHidden = () => {
    setIsNavHiddenShown(false);
  };

  return (
    <div className={`sidebar-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div className={`sidebar-content ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Link href="/admin" className={`nav-item-link sidebar-brand ${isCollapsed ? 'collapsed' : ''} ${pathname === '/admin' ? 'active' : ''}`}>
          <div className="sidebar-brand-icon">
            <Image src={logo} alt="logo-sea-dragon" width={50} height={50} />
          </div>
          <div className="brand-text">SEA DRAGON</div>
        </Link>

        <div className="nav-item">
          <Link href="/admin" className={`nav-item-link ${isCollapsed ? 'collapsed' : ''} ${pathname === '/admin' ? 'active' : ''}`}>
            <FaImages className="link-icon" />
            <span>Hình ảnh</span>
          </Link>
        </div>

        <div className={`nav-item ${pathname.includes('/admin/main-categories') || pathname.includes('/admin/sub-categories') ? 'active' : ''}`}>
          <div className={`nav-item-link ${isCollapsed ? 'collapsed' : ''}`} onClick={toggleNavHidden}>
            <AiOutlineBars className="link-icon" />
            <span>Danh mục</span>
            {isCollapsed ? null : isNavHiddenShown ? (
              <IoIosArrowDown className="link-icon-right" />
            ) : (
              <IoIosArrowForward className="link-icon-right" />
            )}
          </div>
          <div className={`nav-hidden ${isNavHiddenShown ? 'show' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="nav-hidden-list">
              <Link href="/admin/main-categories" className={`nav-hidden-link ${pathname === '/admin/main-categories' ? 'active' : ''}`} onClick={closeNavHidden}>
                Danh mục chính
              </Link>
              <Link href="/admin/sub-categories" className={`nav-hidden-link ${pathname === '/admin/sub-categories' ? 'active' : ''}`} onClick={closeNavHidden}>
                Danh mục cấp 1
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-toggle" onClick={toggleCollapse}>
        {isCollapsed ? <IoIosArrowForward className="link-icon-right" /> : <IoIosArrowBack className="link-icon-right" />}
      </div>
    </div>
  );
}