'use client';
import React from "react";
import { Modal, message } from "antd";
import styled from "styled-components";
import { restoreCategory } from "@/apis/category/category.apis";
import { ICategory } from "@/interfaces/models";

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

interface RestoreCategoryProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  category: ICategory;
}

export default function RestoreCategory({
  isVisible,
  onClose,
  onConfirm,
  category,
}: RestoreCategoryProps) {
  const handleConfirm = async () => {
    try {
      await restoreCategory(category._id); // Gọi API để khôi phục danh mục
      message.success("Danh mục đã được khôi phục.");
      onConfirm(); // Cập nhật danh sách trong MainTrash
    } catch (error) {
      message.error('Có lỗi xảy ra khi khôi phục danh mục.');
    }
  };

  return (
    <Modal
      title="Khôi Phục Danh Mục"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn khôi phục danh mục này không?</p>
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
