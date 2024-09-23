'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateFeedbackModal from '@/components/modals/CreateFeedbackModal';
import CardAdmin from '@/components/cards/Admin/CardAdmin';
import DeleteDashboardItem from '@/components/modals/DeleteDashboardItem';
import { IFeedBack } from '@/interfaces/models';
import './style.scss'; // Nhớ import file SCSS

export default function DashboardLayout() {
  const [uploadedImages, setUploadedImages] = useState<IFeedBack[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3006/api/v1/feedback');
      const data = await response.json();
      setUploadedImages(data.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks(); // Gọi hàm khi component được mount
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleRefreshImages = (newImage: IFeedBack) => {
    setUploadedImages((prev) => [...prev, newImage]);
  };

  const handleDelete = (id: string) => {
    setSelectedFeedbackId(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
    fetchFeedbacks(); // Cập nhật danh sách sau khi xóa
  };

  return (
    <div className="dashboard-container">
      <div className="add-feedback-container">
        <Button className="add-feedback-button" onClick={handleOpenModal}>
          <PlusOutlined /> Thêm Phản Hồi
        </Button>
        <Button
          className="trash-button"
          style={{ marginLeft: 'auto' }}
          onClick={() => window.location.href = '/dashboard-trash'}
        >
          <DeleteOutlined />
        </Button>
      </div>

      <div className="content-item">
        {uploadedImages.map((image) => (
          <CardAdmin 
            key={image?._id} 
            image={image} 
            onDelete={() => handleDelete(image._id)} 
            onEdit={() => {}}
          />
        ))}
      </div>

      <CreateFeedbackModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onUploadComplete={handleRefreshImages}
      />

      <DeleteDashboardItem
        isVisible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        feedbackId={selectedFeedbackId}
      />
    </div>
  );
}
