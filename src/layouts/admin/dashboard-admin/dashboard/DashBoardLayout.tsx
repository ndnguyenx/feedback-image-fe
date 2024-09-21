'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import CreateFeedbackModal from '@/components/modals/CreateFeedbackModal';
import CardAdmin from '@/components/cards/Admin/CardAdmin';
import { IFeedBack } from '@/interfaces/models';

const DashboardContent = styled.div`
  .content-item {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export default function DashboardLayout() {
  const [uploadedImages, setUploadedImages] = useState<IFeedBack[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:3006/api/v1/feedback');
        const data = await response.json();
        setUploadedImages(data.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
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

  return (
    <DashboardContent>
      <Button type="primary" onClick={handleOpenModal}>
        Add New Feedback
      </Button>

      <div className="content-item">
        {uploadedImages.map((image) => (
          <CardAdmin key={image?._id} image={image} />
        ))}
      </div>

      <CreateFeedbackModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onUploadComplete={handleRefreshImages}
      />
    </DashboardContent>
  );
}
