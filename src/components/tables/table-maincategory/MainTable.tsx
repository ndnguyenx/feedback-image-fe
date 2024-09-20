'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import styled from 'styled-components';
import { ICategory } from '@/interfaces/models';
import EditCategoryParent from '@/components/modals/EditCategoryParent';
import DeleteCategoryParent from '@/components/modals/DeleteCategory';

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f2f2f2;
  }

  .ant-table-tbody > tr > td {
    padding: 0.5rem;
  }
`;

interface MainTableProps {
  selectedRowKeys: React.Key[];
  onRowSelectionChange: (newSelectedRowKeys: React.Key[]) => void;
  categories: ICategory[];
  onDeleteCategory: (id: string) => Promise<void>;
  onEditCategory: (id: string, name: string) => Promise<void>;
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

  const handleEdit = (id: string, name: string) => {
    setSelectedCategory({ id, name });
    setEditVisible(true);
  };

  const handleDelete = (id: string) => {
    setSelectedCategory({ id, name: '' }); // Placeholder name
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
        // Không cần gọi fetchCategories ở đây vì danh sách sẽ được cập nhật tự động từ props
        handleDeleteClose();
      } catch (error) {
        message.error('Có lỗi xảy ra khi xóa danh mục.');
      }
    }
  };

  const columns = [
    {
      title: 'STT',
      render: (text: any, record: any, index: number) => index + 1, // Số thứ tự
    },
    { title: 'Tên danh mục', dataIndex: 'name', key: 'name' },
    {
      title: 'Hành động',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <Button onClick={() => handleEdit(record._id, record.name)}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Xóa
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <StyledTable
        dataSource={categories}
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
