'use client';
import React, { useState, useEffect } from 'react';
import { Flex, Input, message } from 'antd';
import ButtonSimple from '@/components/buttons/ButtonSimple';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import SubTable from "@/components/tables/table-subcategory/SubTable";
import AddCategoryChild from "@/components/modals/AddCategoryChild"; 
import { getAllSubCategories, createSubCategory, softRemoveSubCategory } from '@/apis/subCategory/subCategory.apis'; 
import { getCategories } from '@/apis/category/category.apis'; 
import { ISubCategory, ICategory } from "@/interfaces/models"; 
import styled from 'styled-components'; 

const StyledTrashIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* Chiều rộng của icon */
  height: 40px; /* Chiều cao của icon */
  border: 1px solid #ffcccc; /* Border 1px */
  background-color: #ffe6e6; /* Nền đỏ nhạt */
  border-radius: 5px; /* Đường viền bo góc */
  cursor: pointer;

  &:hover {
    background-color: #ffd4d4; /* Nền khi hover */
  }

  svg {
    color: #ff4d4d; /* Màu đỏ đậm cho icon */
    font-size: 1.5rem; /* Kích thước của icon */
  }
`;

const StyledSearchInput = styled(Input)`
  width: 200px; /* Đặt chiều rộng nhỏ lại */
`;

export default function SubCategoryLayout() {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [parentCategories, setParentCategories] = useState<ICategory[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchData = async () => {
    try {
      const [fetchedSubCategories, fetchedParentCategories] = await Promise.all([
        getAllSubCategories(),
        getCategories(),
      ]);
      setSubCategories(fetchedSubCategories);
      setParentCategories(fetchedParentCategories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSubCategory = async (subCategoryData: Partial<ISubCategory>) => {
    try {
      const newSubCategory = await createSubCategory(subCategoryData);
      setSubCategories(prev => [...prev, newSubCategory]);
      setIsAddModalVisible(false);
    } catch (error) {
      console.error('Error adding sub-category:', error);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedRowKeys) {
        await softRemoveSubCategory(id as string); // Xóa mềm từng danh mục đã chọn
      }
      message.success('Danh mục con đã được xóa mềm.');
      setSelectedRowKeys([]); // Reset lại selectedRowKeys
      await fetchData(); // Gọi lại để lấy danh sách mới
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa danh mục con.');
    }
  };

  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Flex justify="space-between" align="center">
        <Flex gap="small">
          <div className="button-delete">
            <Link href="/admin/sub-trash">
              <StyledTrashIcon>
                <FaTrash />
              </StyledTrashIcon>
            </Link>
          </div>
          {selectedRowKeys.length > 0 && (
            <div className="list-check">
              <ButtonSimple text="Xóa" icon={FaTrash} onClick={handleDeleteSelected} />
            </div>
          )}
        </Flex>
        <div className="button-add">
          <ButtonSimple icon={FaPlus} onClick={() => setIsAddModalVisible(true)} />
        </div>
      </Flex>
      <div className="dashboard-search">
        <label htmlFor="search" className="dashboard-search-label">Tìm Kiếm:</label>
        <StyledSearchInput
          type="text"
          placeholder="Nhập tên danh mục con"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dashboard-search-input"
        />
      </div>
      <div style={{ marginTop: '1rem' }} className="dashboard-table"> {/* Cách table 1rem */}
        <SubTable
          subCategories={filteredSubCategories}
          parentCategories={parentCategories}
          selectedRowKeys={selectedRowKeys}
          onRowSelectionChange={setSelectedRowKeys}
          onAddCategory={handleAddSubCategory}
          onRefreshSubCategories={fetchData} // Truyền hàm refresh vào SubTable
        />
      </div>
      <AddCategoryChild
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCategory={handleAddSubCategory}
      />
    </div>
  );
}
