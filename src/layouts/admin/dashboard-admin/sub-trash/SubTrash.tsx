'use client'
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import styled from 'styled-components';
import { ISubCategory, ICategory } from '@/interfaces/models'; 
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import { getCategories } from '@/apis/category/category.apis'; 
import RestoreSubCategory from '@/components/modals/Restore/RestoreSubCategory';
import HardDeleteCategoryChild from '@/components/modals/HardDelete/HardDeleteCategoryChild'; 

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

const SubTrash: React.FC = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState<boolean>(false);
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | null>(null);

  useEffect(() => {
    fetchSubCategories();
    fetchCategories(); 
  }, []);

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllSubCategories({ limit: '20', page: '1', isDeleted: true });
      setSubCategories(response);
    } catch {
      message.error('Có lỗi xảy ra khi lấy danh sách danh mục con đã bị xóa.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch {
      message.error('Có lỗi xảy ra khi lấy danh sách danh mục cha.');
    }
  };

  const showRestoreModal = (subCategory: ISubCategory) => {
    setSelectedSubCategory(subCategory);
    setRestoreModalVisible(true);
  };

  const showHardDeleteModal = (subCategory: ISubCategory) => {
    setSelectedSubCategory(subCategory);
    setHardDeleteModalVisible(true);
  };

  const handleRestore = async () => {
    setRestoreModalVisible(false);
    fetchSubCategories();
  };

  const handleHardDelete = async () => {
    setHardDeleteModalVisible(false);
    fetchSubCategories();
  };

  const getParentCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Không xác định';
  };

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên danh mục con',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Danh mục cha',
      dataIndex: 'categoryID',
      key: 'categoryID',
      render: (categoryId: string) => getParentCategoryName(categoryId),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: ISubCategory) => (
        <>
          <Button type="primary" onClick={() => showRestoreModal(record)}>
            Khôi phục
          </Button>
          <DangerButton onClick={() => showHardDeleteModal(record)} style={{ marginLeft: '1rem' }}>
            Xóa
          </DangerButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Button onClick={() => window.history.back()}>Quay lại</Button>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={subCategories}
      />
      {selectedSubCategory && (
        <RestoreSubCategory
          isVisible={restoreModalVisible}
          onClose={() => setRestoreModalVisible(false)}
          onConfirm={handleRestore}
          subCategory={selectedSubCategory}
        />
      )}
      {selectedSubCategory && (
        <HardDeleteCategoryChild
          isVisible={hardDeleteModalVisible}
          onClose={() => setHardDeleteModalVisible(false)}
          onConfirm={handleHardDelete}
          subCategoryId={selectedSubCategory._id}
        />
      )}
    </>
  );
};

export default SubTrash;
