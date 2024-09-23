'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { ISubCategory } from '@/interfaces/models';
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import RestoreSubCategory from '@/components/modals/RestoreSubCategory';
import HardDeleteCategoryChild from '@/components/modals/HardDeleteCategoryChild'; // Import modal xóa vĩnh viễn

const SubTrash: React.FC = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState<boolean>(false);
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | null>(null);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const response = await getAllSubCategories({ limit: 20, page: 1, isDeleted: true });
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

  const showHardDeleteModal = (subCategory: ISubCategory) => {
    setSelectedSubCategory(subCategory);
    setHardDeleteModalVisible(true);
  };

  const handleRestore = async () => {
    setRestoreModalVisible(false);
    fetchSubCategories(); // Cập nhật lại danh sách sau khi khôi phục
  };

  const handleHardDelete = async () => {
    setHardDeleteModalVisible(false);
    fetchSubCategories(); // Cập nhật lại danh sách sau khi xóa
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
        <>
          <Button type="primary" onClick={() => showRestoreModal(record)}>
            Khôi phục
          </Button>
          <Button  onClick={() => showHardDeleteModal(record)} style={{ marginLeft: '1rem' }}>
            Xóa
          </Button>
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
