'use client';
import React from 'react';
import { Modal, message } from 'antd';
import styled from 'styled-components';
import { softRemoveSubCategory } from '@/apis/subCategory/subCategory.apis';

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

interface DeleteMultiChildProps {
  isVisible: boolean;
  onClose: () => void;
  selectedKeys: string[]; // Danh sách các ID được chọn để xóa
  onConfirm: () => void;  // Callback khi xóa thành công
}

export default function DeleteMultiChild({
  isVisible,
  onClose,
  selectedKeys,
  onConfirm,
}: DeleteMultiChildProps) {
  const handleCancel = () => {
    onClose();
  };

  const handleConfirm = async () => {
    if (selectedKeys.length > 0) {
      try {
        for (const id of selectedKeys) {
          await softRemoveSubCategory(id); // Xóa mềm từng danh mục con được chọn
        }
        message.success('Các danh mục con đã được xóa mềm.');
        onConfirm();  // Gọi lại callback khi hoàn thành
        onClose();  // Đóng modal
      } catch (error) {
        message.error('Có lỗi xảy ra khi xóa các danh mục con.');
      }
    }
  };

  return (
    <Modal
      title="Xóa Nhiều Danh Mục Con"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-body">
          <p>Bạn có chắc chắn muốn xóa các danh mục con đã chọn không?</p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={handleCancel}>
            Hủy bỏ
          </button>
          <button className="btn-sure" onClick={handleConfirm}>
            Có, chắc chắn
          </button>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
