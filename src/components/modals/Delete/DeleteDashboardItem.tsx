'use client';
import React from 'react';
import { Modal, message } from 'antd';
import styled from 'styled-components'; // Thêm import styled-components
import { softRemoveFeedback } from '@/apis/feedback/feedback.apis';

interface DeleteDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  feedbackId: string | null;
}


const ConfirmButton = styled.button`
  color: red; 
  padding: 0.5rem;
  background-color: rgba(255, 0, 0, 0.1); 

  &:hover {
    background-color: rgba(255, 0, 0, 0.2); 
    border-color: red; 
    color: red; 
  }

  &:focus {
    outline: none; 
  }
`;


const CancelButton = styled.button`
  color: #1890ff; 
  background-color: rgba(24, 144, 255, 0.1); 
  padding: 0.5rem;

  &:hover {
    background-color: rgba(24, 144, 255, 0.2); 
    border-color: #1890ff; 
    color: #1890ff;
  }

  &:focus {
    outline: none; 
  }
`;

const DeleteDashboardItem: React.FC<DeleteDashboardItemProps> = ({
  isVisible,
  onClose,
  onConfirm,
  feedbackId,
}) => {
  const handleConfirm = async () => {
    if (feedbackId) {
      try {
        await softRemoveFeedback(feedbackId);
        message.success("Phản hồi đã được xóa mềm.");
        onConfirm();
      } catch {
        message.error('Có lỗi xảy ra khi xóa phản hồi.');
      }
    }
  };

  return (
    <Modal
      title="Xóa Phản Hồi"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <div>
        <p>Bạn có chắc chắn muốn xóa phản hồi này không?</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <ConfirmButton onClick={handleConfirm}>Có, xóa</ConfirmButton>
          <CancelButton onClick={onClose}>Hủy bỏ</CancelButton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDashboardItem;
