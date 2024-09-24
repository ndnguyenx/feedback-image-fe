'use client'
import React, { useState, useEffect } from 'react';
import { Flex } from 'antd';
import { Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import CreateFeedbackModal from '@/components/modals/Add/CreateFeedbackModal';
import EditDashboardItem from '@/components/modals/Edit/EditDashboardItem'; 
import CardAdmin from '@/components/cards/Admin/CardAdmin';
import DeleteDashboardItem from '@/components/modals/Delete/DeleteDashboardItem';
import { IFeedBack } from '@/interfaces/models';
import './style.scss';

export default function DashboardLayout() {
  const [uploadedImages, setUploadedImages] = useState<IFeedBack[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false); 
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<IFeedBack | null>(null); 

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3006/api/v1/feedback');
      const data = await response.json();
      setUploadedImages(data.data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleOpenEditModal = (feedback: IFeedBack) => {
    setSelectedFeedback(feedback); 
    setEditModalVisible(true); 
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
  };

  const handleRefreshImages = (newImage: IFeedBack) => {
    setUploadedImages((prev) => [...prev, newImage]);
  };

  const handleUpdateComplete = () => {
    setEditModalVisible(false);
    fetchFeedbacks(); 
  };

  const handleDelete = (id: string) => {
    setSelectedFeedbackId(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
    fetchFeedbacks();
  };

  return (
    <div className="dashboard-container">
      <Flex className='btn-area' justify="space-between" align="center">
        <div className="button-delete">
          <Button 
            className="trash-button" 
            onClick={() => window.location.href = '/admin/dashboard-trash'}
            icon={<DeleteOutlined />}
          />
        </div>
        <div className="button-add">
          <Button 
            className="add-feedback-button" 
            onClick={handleOpenModal} 
            icon={<PlusOutlined />} 
          />
        </div>
      </Flex>

      <div className="content-item">
        {uploadedImages.map((image) => (
          <CardAdmin 
            key={image?._id} 
            image={image} 
            onDelete={() => handleDelete(image._id)} 
            onEdit={() => handleOpenEditModal(image)} 
          />
        ))}
      </div>

      <CreateFeedbackModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onUploadComplete={handleRefreshImages}
      />

      <EditDashboardItem
        isVisible={editModalVisible} 
        onClose={handleCloseEditModal} 
        feedbackId={selectedFeedback?._id || null}
        onUpdateComplete={handleUpdateComplete} 
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
