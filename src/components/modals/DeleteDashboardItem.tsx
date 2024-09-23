'use client';
import React from 'react';
import { Modal, message } from 'antd';
import { softRemoveFeedback } from '@/apis/feedback/feedback.apis';

interface DeleteDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  feedbackId: string | null;
}

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
      } catch (error) {
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
          <button onClick={onClose}>Hủy bỏ</button>
          <button onClick={handleConfirm}>Có, xóa</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDashboardItem;
