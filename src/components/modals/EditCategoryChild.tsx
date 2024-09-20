import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { updateSubCategory, getAllSubCategories } from "@/apis/subCategory/subCategory.apis";
import { ISubCategory } from "@/interfaces/models";

interface EditCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  subCategoryId: string | null;
  subCategoryName: string | null;
  cateId: string | null;
}

const EditCategoryChild: React.FC<EditCategoryChildProps> = ({ isVisible, onClose, subCategoryId, subCategoryName, cateId }) => {
  const [form] = Form.useForm();
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

  useEffect(() => {
    if (isVisible && subCategoryId) {
      form.setFieldsValue({ name: subCategoryName });
      fetchSubCategories();
    }
  }, [isVisible, subCategoryId]);

  const fetchSubCategories = async () => {
    try {
      const result = await getAllSubCategories();
      setSubCategories(result);
    } catch (error) {
      console.error('Error fetching sub-categories:', error);
    }
  };

  const handleEditCategory = async (values: Partial<ISubCategory>) => {
    if (subCategoryId) {
      try {
        await updateSubCategory(subCategoryId, values);
        form.resetFields();
        onClose(); // Close modal after successful update
      } catch (error) {
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
