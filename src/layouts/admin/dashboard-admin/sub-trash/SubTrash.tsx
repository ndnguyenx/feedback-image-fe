'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { ISubCategory, ICategory } from '@/interfaces/models'; // Import ICategory
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import { getCategories } from '@/apis/category/category.apis'; // Import API để lấy danh mục cha
import RestoreSubCategory from '@/components/modals/RestoreSubCategory';
import HardDeleteCategoryChild from '@/components/modals/HardDeleteCategoryChild'; // Import modal xóa vĩnh viễn

const SubTrash: React.FC = () => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]); // State để lưu danh mục cha
  const [loading, setLoading] = useState<boolean>(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState<boolean>(false);
  const [hardDeleteModalVisible, setHardDeleteModalVisible] = useState<boolean>(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ISubCategory | null>(null);

  useEffect(() => {
    fetchSubCategories();
    fetchCategories(); // Tải danh mục cha
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

  const fetchCategories = async () => {
    try {
      const response = await getCategories(); // Gọi API lấy danh mục cha
      setCategories(response);
    } catch (error) {
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
    fetchSubCategories(); // Cập nhật lại danh sách sau khi khôi phục
  };

  const handleHardDelete = async () => {
    setHardDeleteModalVisible(false);
    fetchSubCategories(); // Cập nhật lại danh sách sau khi xóa
  };

  // Hàm để lấy tên danh mục cha từ ID
  const getParentCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Không xác định'; // Trả về tên hoặc thông báo nếu không tìm thấy
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
      render: (categoryId: string) => getParentCategoryName(categoryId), // Hiển thị tên danh mục cha
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: ISubCategory) => (
        <>
          <Button type="primary" onClick={() => showRestoreModal(record)}>
            Khôi phục
          </Button>
          <Button onClick={() => showHardDeleteModal(record)} style={{ marginLeft: '1rem' }}>
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
