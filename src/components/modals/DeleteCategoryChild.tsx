import React from "react";
import { Modal, Button } from "antd";
import { deleteSubCategory } from "@/apis/subCategory/subCategory.apis";

interface DeleteCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  subCategoryId: string | null;
}

const DeleteCategoryChild: React.FC<DeleteCategoryChildProps> = ({ isVisible, onClose, subCategoryId }) => {
  const handleDelete = async () => {
    if (subCategoryId) {
      try {
        await deleteSubCategory(subCategoryId);
        onClose(); // Close modal after successful deletion
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <Modal
      title="Xóa Danh Mục Con"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="delete" type="primary" danger onClick={handleDelete}>
          Xóa
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa danh mục con này không?</p>
    </Modal>
  );
};

export default DeleteCategoryChild;
