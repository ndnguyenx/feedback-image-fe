'use client'
import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { ISubCategory, ICategory } from '@/interfaces/models';
import EditCategoryChild from '@/components/modals/EditCategoryChild';
import DeleteCategoryChild from '@/components/modals/DeleteCategoryChild';
import AddCategoryChild from '@/components/modals/AddCategoryChild';

interface ITableComponentProps {
  subCategories: ISubCategory[];
  parentCategories: ICategory[];
  selectedRowKeys: React.Key[];
  onRowSelectionChange: (newSelectedRowKeys: React.Key[]) => void;
  onAddCategory: (subCategoryData: Partial<ISubCategory>) => Promise<void>;
}

const SubTable: React.FC<ITableComponentProps> = ({
  subCategories,
  parentCategories,
  selectedRowKeys,
  onRowSelectionChange,
  onAddCategory
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<ISubCategory | null>(null);
  const [deletingSubCategoryId, setDeletingSubCategoryId] = useState<string | null>(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const showEditModal = (subCategory: ISubCategory) => {
    setEditingSubCategory(subCategory);
    setEditModalVisible(true);
  };

  const showDeleteModal = (subCategoryId: string) => {
    setDeletingSubCategoryId(subCategoryId);
    setDeleteModalVisible(true);
  };

  const columns = [
    {
      title: 'Số thứ tự',
      dataIndex: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Danh mục cha',
      dataIndex: 'categoryID',
      key: 'categoryID',
      render: (categoryID: string) => (
        <span>{parentCategories.find(category => category._id === categoryID)?.name || 'Không tìm thấy'}</span>
      ),
    },
    {
      title: 'Danh mục con',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span>{name}</span>,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: ISubCategory) => (
        <div>
          <Button onClick={() => showEditModal(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Button danger onClick={() => showDeleteModal(record._id)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        rowKey="_id"
        rowSelection={{
          selectedRowKeys,
          onChange: onRowSelectionChange,
        }}
        columns={columns}
        dataSource={subCategories}
      />
      {editingSubCategory && (
        <EditCategoryChild
          isVisible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          subCategoryId={editingSubCategory._id}
          subCategoryName={editingSubCategory.name}
          cateId={editingSubCategory.categoryID}
        />
      )}
      <DeleteCategoryChild
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        subCategoryId={deletingSubCategoryId}
      />
      <AddCategoryChild
        isVisible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAddCategory={onAddCategory}
      />
    </>
  );
};

export default SubTable;
