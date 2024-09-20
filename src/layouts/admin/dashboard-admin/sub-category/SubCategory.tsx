'use client';
import React, { useState, useEffect } from 'react';
import { Flex, Input } from 'antd';
import ButtonSimple from '@/components/buttons/ButtonSimple';
import { FaPlus, FaTrash } from 'react-icons/fa';
import SubTable from "@/components/tables/table-subcategory/SubTable";
import AddCategoryChild from "@/components/modals/AddCategoryChild"; 
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis'; 
import { getCategories } from '@/apis/category/category.apis'; 
import { ISubCategory, ICategory } from "@/interfaces/models"; 
import { createSubCategory } from '@/apis/subCategory/subCategory.apis'; 

export default function SubCategoryLayout() {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [parentCategories, setParentCategories] = useState<ICategory[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State cho input tìm kiếm

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
    fetchData(); // Gọi fetchData khi component được mount
  }, []);

  const handleAddSubCategory = async (subCategoryData: Partial<ISubCategory>) => {
    try {
      const newSubCategory = await createSubCategory(subCategoryData); // Gọi hàm để thêm danh mục con
      setSubCategories([...subCategories, newSubCategory]); // Cập nhật danh sách danh mục con
      setIsAddModalVisible(false); // Đóng modal sau khi thêm thành công
    } catch (error) {
      console.error('Error adding sub-category:', error);
    }
  };

  const handleDeleteSelected = async () => {
    // Logic để xóa danh mục đã chọn
  };

  // Lọc danh sách subCategories dựa trên searchTerm
  const filteredSubCategories = subCategories.filter(subCategory =>
    subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Flex justify="space-between" align="center">
        <Flex gap="small">
          <div className="button-delete">
            <ButtonSimple icon={FaTrash} onClick={handleDeleteSelected} />
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
      {/* Input tìm kiếm */}
      <div className="dashboard-search">
        <label htmlFor="search" className="dashboard-search-label">Tìm Kiếm:</label>
        <Input
          type="text"
          placeholder="Nhập tên danh mục con"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dashboard-search-input"
        />
      </div>
      <div className="dashboard-table">
        <SubTable
          subCategories={filteredSubCategories} // Sử dụng danh sách đã lọc
          parentCategories={parentCategories}
          selectedRowKeys={selectedRowKeys}
          onRowSelectionChange={setSelectedRowKeys}
          onAddCategory={handleAddSubCategory} // Thêm thuộc tính này
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
