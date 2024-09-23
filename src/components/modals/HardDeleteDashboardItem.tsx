'use client';
import React from 'react';
import { Modal, Button } from 'antd';
import { deleteFeedback } from '@/apis/feedback/feedback.apis';

interface HardDeleteDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  feedbackId: string | null;
  onHardDeleteComplete: () => void;
}

const HardDeleteDashboardItem: React.FC<HardDeleteDashboardItemProps> = ({
  isVisible,
  onClose,
  feedbackId,
  onHardDeleteComplete,
}) => {
  const handleHardDelete = async () => {
    if (feedbackId) {
      try {
        await deleteFeedback(feedbackId); // Gọi API để xóa vĩnh viễn phản hồi
        onHardDeleteComplete(); // Cập nhật danh sách sau khi xóa vĩnh viễn
        onClose(); // Đóng modal
      } catch (error) {
        console.error('Error hard deleting feedback:', error);
      }
    }
  };

  return (
    <Modal
      title="Xóa Vĩnh Viễn Phản Hồi"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="delete" type="default" onClick={handleHardDelete}>
          Xóa Vĩnh Viễn
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa vĩnh viễn phản hồi này không?</p>
    </Modal>
  );
};

export default HardDeleteDashboardItem;
