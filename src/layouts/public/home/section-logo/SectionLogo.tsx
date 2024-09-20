'use client'
import Image from "next/image";
import logo from "@/assets/images/logo-text.png";
import './style.scss';



export function SectionLogo() {
  return (
    <div className="section-logo">
      <Image className="section-logo-item" src={logo} alt="logo"  />
    </div>
  )
}