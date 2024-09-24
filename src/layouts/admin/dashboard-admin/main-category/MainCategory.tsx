'use client';
import React, { useState, useEffect } from 'react';
import { Flex } from 'antd';
import ButtonSimple from '@/components/buttons/ButtonSimple';
import Link from 'next/link';
import MainTable from '@/components/tables/table-maincategory/MainTable';
import { FaPlus, FaTrash } from 'react-icons/fa';
import AddCategoryParent from '@/components/modals/Add/AddCategoryParent';
import DeleteMultiParent from '@/components/modals/Delete/DeleteMultiParent'; // Import modal xóa nhiều mục
import { createCategory, getCategories } from '@/apis/category/category.apis';
import { ICategory } from '@/interfaces/models';
import './style.scss';

export default function MainCategoryLayout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMultiDeleteModalVisible, setIsMultiDeleteModalVisible] = useState(false); // State cho modal xóa nhiều
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
      setCategories(updatedCategories);
      resetForm();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategories = () => {
    setIsMultiDeleteModalVisible(true); // Hiển thị modal xóa nhiều mục
  };

  const handleMultiDeleteConfirm = async (selectedKeys: React.Key[]) => {
    // Thêm logic xóa nhiều mục ở đây nếu cần
    // const updatedCategories = await deleteCategories(selectedKeys); // Gọi hàm xóa nếu có
    const updatedCategories = await getCategories(); // Lấy lại danh sách categories
    setCategories(updatedCategories);
    setSelectedRowKeys([]); // Xóa lựa chọn sau khi xóa
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
      <Flex className='btn-area' justify="space-between" align="center">
        <Flex gap="small">
          <div className="button-delete">
            <Link href="/admin/main-trash">
              <ButtonSimple className='trash-icon' icon={FaTrash} />
            </Link>
          </div>
          {selectedRowKeys.length > 0 && (
            <div className="list-check">
              <ButtonSimple className='multidel-btn' text='Xóa' icon={FaTrash} onClick={handleDeleteCategories} />
            </div>
          )}
        </Flex>
        <div className="button-add">
          <ButtonSimple icon={FaPlus} onClick={showModal} />
        </div>
      </Flex>
      <div className="dashboard-table">
        <div className="table-item">
          <MainTable
            selectedRowKeys={selectedRowKeys}
            onRowSelectionChange={handleRowSelectionChange}
            categories={categories}
            onDeleteCategory={async (id: string) => {
              // Nếu bạn muốn thực hiện hành động xóa ở đây, có thể thêm logic
              const updatedCategories = await getCategories();
              setCategories(updatedCategories);
            }}
            onEditCategory={async () => {
              const fetchedCategories = await getCategories();
              setCategories(fetchedCategories);
            }}
          />
        </div>
      </div>
      <AddCategoryParent
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onAddCategory={handleAddCategory}
      />
      <DeleteMultiParent
        isVisible={isMultiDeleteModalVisible}
        onClose={() => setIsMultiDeleteModalVisible(false)}
        onConfirm={handleMultiDeleteConfirm}
        selectedKeys={selectedRowKeys} 
      />
    </div>
  );
}
