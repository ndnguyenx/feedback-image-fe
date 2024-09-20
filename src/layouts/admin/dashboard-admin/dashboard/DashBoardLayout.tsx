"use client";
import "./style.scss";
import React from "react";
import CardAdmin from "@/components/cards/Admin/CardAdmin";
import { Flex } from "antd";
import CustomCheckbox from "@/components/checkbox/checkbox";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import ModalCreateComponent from "@/components/modals/CreateImage";
import ButtonSimple from "@/components/buttons/ButtonSimple";
import Link from "next/link";

export default function DashboardLayout(){
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="dashboard-container">
      <Flex justify="space-between" align="center">
        <Flex gap="small">
          <div className="button-trash">
            <Link href={"/admin/trash?isDeleted=true"}>
              <ButtonSimple icon={FaTrash} />
            </Link>
          </div>
          <div hidden>
            <ButtonSimple text="Xóa" icon={FaTrash} />
          </div>
        </Flex>
        <div className="button-add">
          <ButtonSimple
            icon={FaPlus}
            onClick={showModal}
          />
        </div>
      </Flex>
      <div className="dashboard-list-button">
        <div className="list-check">
          <CustomCheckbox
            label="Chọn tất cả"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-item">
          <CardAdmin />
        </div>
      </div>
      <ModalCreateComponent
        isVisible={isModalVisible}
        onClose={handleCloseModal}
      />
    </div>
  );
};


