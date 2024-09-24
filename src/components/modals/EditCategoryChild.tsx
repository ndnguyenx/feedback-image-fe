import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { updateSubCategory } from "@/apis/subCategory/subCategory.apis";
import { ISubCategory } from "@/interfaces/models";

interface EditCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  subCategoryId: string; // Chỉ nhận string
  subCategoryName: string; // Chỉ nhận string
  cateId?: string; // Có thể để là string hoặc undefined
  onRefreshSubCategories: () => Promise<void>; // Thêm props
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
      await onRefreshSubCategories(); // Gọi lại hàm refresh
      onClose(); // Đóng modal sau khi cập nhật thành công
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật danh mục con.');
      console.error('Error updating category:', error);
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
