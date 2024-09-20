'use client';
import React, { useState, useEffect } from 'react';
import { Flex } from 'antd';
import ButtonSimple from '@/components/buttons/ButtonSimple';
import Link from 'next/link';
import MainTable from '@/components/tables/table-maincategory/MainTable';
import { FaPlus, FaTrash } from 'react-icons/fa';
import AddCategoryParent from '@/components/modals/AddCategoryParent';
import { createCategory, deleteCategory, getCategories } from '@/apis/category/category.apis';
import { ICategory } from '@/interfaces/models';

export default function MainCategoryLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRowSelectionChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleAddCategory = async (categoryData: { name: string }, resetForm: () => void) => {
    try {
      await createCategory(categoryData);
      const updatedCategories = await getCategories();
      setCategories(updatedCategories); // Cập nhật lại danh sách
      resetForm(); // Reset form sau khi thêm
      setIsModalVisible(false); // Đóng modal sau khi thêm thành công
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategories = async () => {
    try {
      for (const key of selectedRowKeys) {
        await deleteCategory(key.toString());
      }
      const updatedCategories = await getCategories();
      setCategories(updatedCategories);
      setSelectedRowKeys([]); // Xóa selection sau khi xóa
    } catch (error) {
      console.error('Error deleting categories:', error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="dashboard-container">
      <Flex justify="space-between" align="center">
        <Flex gap="small">
          <div className="button-delete">
            <Link href="/admin/main-trash">
              <ButtonSimple icon={FaTrash} />
            </Link>
          </div>
          {selectedRowKeys.length > 0 && (
            <div className="list-check">
              <ButtonSimple text="Xóa" icon={FaTrash} onClick={handleDeleteCategories} />
            </div>
          )}
        </Flex>
        <div className="button-add">
          <ButtonSimple icon={FaPlus} onClick={showModal} />
        </div>
      </Flex>
      <div className="dashboard-search">
        <label htmlFor="search" className="dashboard-search-label">Tìm Kiếm:</label>
        <input type="text" className="dashboard-search-input" id="search" />
      </div>
      <div className="dashboard-table">
        <div className="table-item">
          <MainTable
            selectedRowKeys={selectedRowKeys}
            onRowSelectionChange={handleRowSelectionChange}
            categories={categories}
            onDeleteCategory={async (id: string) => {
              await deleteCategory(id);
              const updatedCategories = await getCategories();
              setCategories(updatedCategories);
            }}
            onEditCategory={async (id: string, name: string) => {
              // Thêm logic chỉnh sửa nếu cần
            }}
          />
        </div>
      </div>
      <AddCategoryParent
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}
