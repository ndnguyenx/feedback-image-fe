'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { ISubCategory } from '@/interfaces/models';
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import RestoreSubCategory from '@/components/modals/RestoreSubCategory';

const SubTrash: React.FC = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | null>(null);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllSubCategories({ limit: 20, page: 1, isDeleted: true }); // Lấy danh mục con đã bị xóa mềm
      setSubCategories(response);
    } catch (error) {
      message.error('Có lỗi xảy ra khi lấy danh sách danh mục con đã bị xóa.');
    } finally {
      setLoading(false);
    }
  };

  const showRestoreModal = (subCategory: ISubCategory) => {
    setSelectedSubCategory(subCategory);
    setRestoreModalVisible(true);
  };

  const handleRestore = async () => {
    setRestoreModalVisible(false);
    fetchSubCategories(); // Cập nhật lại danh sách sau khi khôi phục
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
      title: 'ID danh mục cha',
      dataIndex: 'categoryID',
      key: 'categoryID',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: ISubCategory) => (
        <Button type="primary" onClick={() => showRestoreModal(record)}>
          Khôi phục
        </Button>
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
    </>
  );
};

export default SubTrash;
