"use client";

import "./cardadmin.scss";
import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import test from "@/assets/images/test.jpg";
import ModalEditComponent from "@/components/modals/EditImage";

export default function CardAdmin() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const showEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
      <div className="card-content">
        <div className="styled-card">
          <div className="actions-wrapper">
            <Checkbox />
            <button className="delete-button">
              <IoClose />
            </button>
          </div>
          <Image className="styled-image" alt="img-feed-back" src={test} />
          <div className="actions-wrapper-des">
            <span className="actions-wrapper-des-content">
              123123123123123123123123123123123123123123123123123
            </span>
            <span className="actions-wrapper-des-content">abc</span>
          </div>
          <button className="edit-button" onClick={showEditModal}>
            Sửa
          </button>
        </div>
      </div>

      <ModalEditComponent
        isVisible={isEditModalVisible}
        onClose={handleCloseEditModal}
      />
    </>
  );
}
