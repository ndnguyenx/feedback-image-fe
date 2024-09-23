import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updateSubCategory } from "@/apis/subCategory/subCategory.apis";
import { ISubCategory } from "@/interfaces/models";

interface EditCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  subCategoryId: string | null;
  subCategoryName: string | null;
  cateId: string | null; // Duy trì nếu cần thiết, nếu không có thể bỏ qua
}

const EditCategoryChild: React.FC<EditCategoryChildProps> = ({ isVisible, onClose, subCategoryId, subCategoryName }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible && subCategoryId) {
      form.setFieldsValue({ name: subCategoryName });
    }
  }, [isVisible, subCategoryId, subCategoryName]);

  const handleEditCategory = async (values: Partial<ISubCategory>) => {
    if (subCategoryId) {
      try {
        await updateSubCategory(subCategoryId, values);
        message.success("Danh mục con đã được cập nhật thành công!");
        form.resetFields();
        onClose(); // Đóng modal sau khi cập nhật thành công
      } catch (error) {
        message.error('Có lỗi xảy ra khi cập nhật danh mục con.');
        console.error('Error updating category:', error);
      }
    }
  };

  return (
    <Modal
      title="Sửa Danh Mục Con"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleEditCategory} layout="vertical">
        <Form.Item
          label="Tên Danh Mục Con"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục con!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCategoryChild;
