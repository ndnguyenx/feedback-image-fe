'use client';
import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updateSubCategory } from "@/apis/subCategory/subCategory.apis";
import { ISubCategory } from "@/interfaces/models";

interface EditCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  subCategoryId: string; 
  subCategoryName: string; 
  cateId?: string; 
  onRefreshSubCategories: () => Promise<void>; 
}

const EditCategoryChild: React.FC<EditCategoryChildProps> = ({
  isVisible,
  onClose,
  subCategoryId,
  subCategoryName,
  cateId,
  onRefreshSubCategories,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible) {
      form.setFieldsValue({ name: subCategoryName });
    }
  }, [isVisible, subCategoryName]);

  const handleEditCategory = async (values: Partial<ISubCategory>) => {
    try {
      await updateSubCategory(subCategoryId, { ...values, categoryID: cateId });
      message.success("Danh mục con đã được cập nhật thành công!");
      form.resetFields();
      await onRefreshSubCategories(); 
      onClose();
    } catch {
      message.error('Có lỗi xảy ra khi cập nhật danh mục con.');
    }
  };

  return (
    <Modal
      title="Sửa Danh Mục Con"
      visible={isVisible}
      onCancel={onClose}
      footer={null} // Đặt footer là null để tùy chỉnh
    >
      <Form form={form} onFinish={handleEditCategory} layout="vertical">
        <Form.Item
          label="Tên Danh Mục Con"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục con!' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryChild;
