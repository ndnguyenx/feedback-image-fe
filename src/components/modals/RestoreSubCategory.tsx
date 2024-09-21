'use client';
import React from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { restoreSubCategory } from "@/apis/subCategory/subCategory.apis"; // API khôi phục danh mục con
import { ISubCategory } from "@/interfaces/models";

const StyledModalContent = styled.div`
  .modal-body {
    padding: 1rem;
    margin: 1rem auto;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #e9ecef;
    gap: 1rem;

    .btn-cancel {
      padding: 0.5rem;
      border-radius: 6px;
      width: auto;
      background-color: #858796;
      color: var(--color-white);
      &:hover {
        opacity: 0.8;
      }
    }

    .btn-sure {
      padding: 0.5rem;
      border-radius: 6px;
      width: auto;
      background-color: var(--color-primary);
      color: var(--color-white);
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

interface RestoreSubCategoryProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subCategory: ISubCategory;
}

export default function RestoreSubCategory({
  isVisible,
  onClose,
  onConfirm,
  subCategory,
}: RestoreSubCategoryProps) {
  const handleConfirm = async () => {
    try {
      await restoreSubCategory(subCategory._id); // Gọi API để khôi phục danh mục con
      message.success("Danh mục con đã được khôi phục.");
      onConfirm(); // Cập nhật danh sách trong SubTrash
    } catch (error) {
      message.error('Có lỗi xảy ra khi khôi phục danh mục con.');
    }
  };

  return (
    <Modal
      title="Khôi Phục Danh Mục Con"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn khôi phục danh mục con này không?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Hủy bỏ
          </button>
          <button className="btn-sure" onClick={handleConfirm}>
            Có, khôi phục
          </button>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
