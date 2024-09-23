'use client';
import React, { useState, useEffect } from 'react';
import { IFeedBack } from '@/interfaces/models';
import CardAdminTrash from '@/components/cards/Admin/CardAdminTrash';
import { restoreFeedback } from '@/apis/feedback/feedback.apis';
import './style.scss';

export default function DashboardTrash() {
  const [deletedFeedbacks, setDeletedFeedbacks] = useState<IFeedBack[]>([]);

  const fetchDeletedFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3006/api/v1/feedback/deleted'); // Endpoint để lấy phản hồi đã xóa
      const data = await response.json();
      setDeletedFeedbacks(data.data);
    } catch (error) {
      console.error('Error fetching deleted feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchDeletedFeedbacks();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await restoreFeedback(id); // Gọi API để khôi phục phản hồi
      fetchDeletedFeedbacks(); // Cập nhật danh sách sau khi khôi phục
    } catch (error) {
      console.error('Error restoring feedback:', error);
    }
  };

  return (
    <div className="dashboard-trash-container">
      <h2>Thùng Rác</h2>
      <div className="content-item">
        {deletedFeedbacks.map((feedback) => (
          <CardAdminTrash 
            key={feedback._id} 
            image={feedback} 
            onRestore={handleRestore} 
          />
        ))}
      </div>
    </div>
  );
}
