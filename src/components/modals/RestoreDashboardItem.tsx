'use client';
import React from 'react';
import { Modal, Button } from 'antd';
import { IFeedBack } from '@/interfaces/models';
import { restoreFeedback } from '@/apis/feedback/feedback.apis';

interface RestoreDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  feedbackId: string | null;
  onRestoreComplete: () => void;
}

const RestoreDashboardItem: React.FC<RestoreDashboardItemProps> = ({
  isVisible,
  onClose,
  feedbackId,
  onRestoreComplete,
}) => {
  const handleRestore = async () => {
    if (feedbackId) {
      try {
        await restoreFeedback(feedbackId); // Gọi API để khôi phục phản hồi
        onRestoreComplete(); // Cập nhật danh sách sau khi khôi phục
        onClose(); // Đóng modal
      } catch (error) {
        console.error('Error restoring feedback:', error);
      }
    }
  };

  return (
    <Modal
      title="Khôi Phục Phản Hồi"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="restore" type="primary" onClick={handleRestore}>
          Khôi Phục
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn khôi phục phản hồi này không?</p>
    </Modal>
  );
};

export default RestoreDashboardItem;
