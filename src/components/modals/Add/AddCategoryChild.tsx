import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import styled from 'styled-components'; // Import styled-components
import { ISubCategory, ICategory } from '@/interfaces/models';
import { getCategories } from '@/apis/category/category.apis';

interface AddCategoryChildProps {
  isVisible: boolean;
  onClose: () => void;
  onAddCategory: (subCategoryData: Partial<ISubCategory>) => Promise<void>;
}

const StyledModalFooter = styled.div`
  display: flex;
  justify-content: flex-end; // Căn phải
  gap: 1rem; // Khoảng cách giữa các nút
`;

const AddCategoryChild: React.FC<AddCategoryChildProps> = ({ isVisible, onClose, onAddCategory }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('Lỗi khi tải danh mục cha.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleFinish = async (values: Partial<ISubCategory>) => {
    try {
      await onAddCategory(values);
      form.resetFields(); // Reset fields after adding
      message.success('Thêm danh mục con thành công.');
      onClose();
    } catch {
      message.error('Có lỗi xảy ra khi thêm danh mục con.');
    }
  };

  return (
    <Modal
      title="Thêm danh mục con"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="categoryID"
          label="Danh mục cha"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục cha!' }]}
        >
          <Select loading={loading} placeholder="Chọn danh mục cha">
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <StyledModalFooter>
            <Button type="default" onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit">Thêm</Button>
          </StyledModalFooter>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryChild;
