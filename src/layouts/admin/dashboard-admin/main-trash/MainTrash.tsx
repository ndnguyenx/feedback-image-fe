'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import styled from 'styled-components';
import { ICategory } from '@/interfaces/models';
import { getCategories, restoreCategory, DeleteCategory } from '@/apis/category/category.apis';
import RestoreCategory from '@/components/modals/Restore/RestoreCategory';
import HardDeleteCategory from '@/components/modals/HardDelete/HardDeleteCategory'; // Nhập HardDeleteCategory

const StyledTable = styled(Table)`
  width: 95%; /* Giảm độ rộng bảng */
  margin: 0 auto; /* Căn giữa bảng */

  .ant-table-thead > tr > th {
    background-color: #4e73df; /* Thay màu thành #4e73df */
    color: white; /* Màu chữ */
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f2f2f2;
  }

  .ant-table-tbody > tr > td {
    padding: 0.5rem;
  }
`;

const BackButton = styled(Button)`
  margin-bottom: 1rem; 
`;

const DangerButton = styled(Button)`
  color: red !important; 
  border-color: red !important; 
  background-color: rgba(255, 0, 0, 0.1) !important; 

  &:hover {
    background-color: rgba(255, 0, 0, 0.2) !important; 
    border-color: red !important; 
    color: red !important; 
  }

  &:focus {
    color: red !important; 
    border-color: red !important; 
  }
`;

export default function MainTrash() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [restoreVisible, setRestoreVisible] = useState(false);
  const [hardDeleteVisible, setHardDeleteVisible] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await getCategories({ limit: '20', page: '1', isDeleted: true });
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRestore = (category: ICategory) => {
    setSelectedCategory(category);
    setRestoreVisible(true);
  };

  const handleHardDelete = (category: ICategory) => {
    setSelectedCategory(category);
    setHardDeleteVisible(true); // Mở modal xóa vĩnh viễn
  };

  const handleRestoreConfirm = async () => {
    if (selectedCategory) {
      try {
        await restoreCategory(selectedCategory._id); // Khôi phục danh mục
        message.success("Danh mục đã được khôi phục.");
        fetchCategories(); // Cập nhật danh sách
        setRestoreVisible(false);
      } catch {
        message.error("Có lỗi xảy ra khi khôi phục danh mục.");
      }
    }
  };

  const handleHardDeleteConfirm = async () => {
    if (selectedCategory) {
      try {
        await DeleteCategory(selectedCategory._id); // Xóa vĩnh viễn danh mục
        message.success("Danh mục đã được xóa vĩnh viễn.");
        fetchCategories(); // Cập nhật danh sách
        setHardDeleteVisible(false);
      } catch {
        message.error("Có lỗi xảy ra khi xóa danh mục.");
      }
    }
  };

  const columns = [
    {
      title: 'Số thứ tự',
      render: (text: any, record: any, index: number) => index + 1,
    },
    { 
      title: 'Tên danh mục', 
      dataIndex: 'name', 
      key: 'name' 
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Button type='primary' onClick={() => handleRestore(record)}>Khôi phục</Button>
          <DangerButton onClick={() => handleHardDelete(record)} style={{ marginLeft: '1rem' }}>
            Xóa
          </DangerButton> 
        </>
      ),
    },
  ];

  return (
    <>
      <BackButton onClick={() => window.history.back()}>Quay lại</BackButton>
      <StyledTable
        dataSource={categories}
        columns={columns}
        rowKey="_id"
      />
      {selectedCategory && (
        <RestoreCategory
          isVisible={restoreVisible}
          onClose={() => setRestoreVisible(false)}
          onConfirm={handleRestoreConfirm}
          category={selectedCategory}
        />
      )}
      {selectedCategory && (
        <HardDeleteCategory
          isVisible={hardDeleteVisible}
          onClose={() => setHardDeleteVisible(false)}
          onConfirm={handleHardDeleteConfirm}
          categoryId={selectedCategory._id}
        />
      )}
    </>
  );
}
