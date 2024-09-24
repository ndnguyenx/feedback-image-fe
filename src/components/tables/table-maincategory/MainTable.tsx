'use client';
import React, { useState } from 'react';
import { Table, Button, message, Input } from 'antd';
import styled from 'styled-components';
import { ICategory } from '@/interfaces/models';
import EditCategoryParent from '@/components/modals/EditCategoryParent';
import DeleteCategoryParent from '@/components/modals/DeleteCategory';

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #4e73df; // Màu tiêu đề cột
    color: var(--color-white);
    font-weight: bold; // Chữ đậm hơn
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f2f2f2;
  }

  .ant-table-tbody > tr > td {
    padding: 0.5rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 200px; // Điều chỉnh width của input
  margin-left: 1rem; // Khoảng cách với label
`;

const ActionButton = styled(Button)`
  margin-right: 1rem; // Khoảng cách giữa button 'Sửa' và 'Xóa'
`;

interface MainTableProps {
  selectedRowKeys: React.Key[];
  onRowSelectionChange: (newSelectedRowKeys: React.Key[]) => void;
  categories: ICategory[];
  onDeleteCategory: (id: string) => Promise<void>;
  onEditCategory: () => Promise<void>;
}

export default function MainTable({
  selectedRowKeys,
  onRowSelectionChange,
  categories,
  onDeleteCategory,
  onEditCategory,
}: MainTableProps) {
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleEdit = (id: string, name: string) => {
    setSelectedCategory({ id, name });
    setEditVisible(true);
  };

  const handleDelete = (id: string) => {
    setSelectedCategory({ id, name: '' });
    setDeleteVisible(true);
  };

  const handleEditClose = () => {
    setEditVisible(false);
    setSelectedCategory(null);
  };

  const handleDeleteClose = () => {
    setDeleteVisible(false);
    setSelectedCategory(null);
  };

  const handleDeleteConfirm = async () => {
    if (selectedCategory?.id) {
      try {
        await onDeleteCategory(selectedCategory.id);
        message.success('Danh mục đã được xóa mềm.');
        handleDeleteClose();
      } catch (error) {
        message.error('Có lỗi xảy ra khi xóa danh mục.');
      }
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'STT',
      render: (text: any, record: any, index: number) => index + 1,
    },
    { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
    {
      title: 'Hành động',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <ActionButton onClick={() => handleEdit(record._id, record.name)}>Sửa</ActionButton>
          <ActionButton danger onClick={() => handleDelete(record._id)}>
            Xóa
          </ActionButton>
        </span>
      ),
    },
  ];

  return (
    <>
      <SearchContainer>
        <label htmlFor="search" className="dashboard-search-label">Tìm Kiếm:</label>
        <StyledInput
          type="text"
          id="search"
          placeholder="Nhập tên danh mục chính"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      <StyledTable
        dataSource={filteredCategories}
        columns={columns}
        rowKey="_id"
        rowSelection={{
          selectedRowKeys,
          onChange: onRowSelectionChange,
        }}
      />
      {selectedCategory && (
        <EditCategoryParent
          isVisible={editVisible}
          onClose={handleEditClose}
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
          onSuccess={() =>onEditCategory()}
        />
      )}
      {selectedCategory && (
        <DeleteCategoryParent
          isVisible={deleteVisible}
          onClose={handleDeleteClose}
          onConfirm={handleDeleteConfirm}
          categoryId={selectedCategory.id}
        />
      )}
    </>
  );
}
