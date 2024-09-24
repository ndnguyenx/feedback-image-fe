'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, message } from 'antd';
import { ISubCategory } from '@/interfaces/models';
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import { updateFeedback } from '@/apis/feedback/feedback.apis';

interface EditDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  feedbackId: string | null;  
  onUpdateComplete: () => void;
}

export default function EditDashboardItem({
  isVisible,
  onClose,
  feedbackId,
  onUpdateComplete,
}: EditDashboardItemProps) {
  const [imgName, setImgName] = useState('');
  const [description, setDescription] = useState('');
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const subCategories = await getAllSubCategories();
        setSubCategories(subCategories);
      } catch (error) {
        console.error('Error fetching sub-categories:', error);
        message.error('Có lỗi xảy ra khi lấy danh mục con.');
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (feedbackId) { 
      console.log('Feedback ID:', feedbackId);
      const fetchFeedbackById = async () => {
        try {
          const response = await fetch(`http://localhost:3006/api/v1/feedback/${feedbackId}`);
          const data = await response.json();
          const feedback = data.data;
          setImgName(feedback?.nameFeedback || '');
          setDescription(feedback?.description || '');
          setSelectedSubCategory(feedback?.subCategory?._id || undefined);
          // Chúng ta không sử dụng previewImage, nên có thể bỏ nó đi
          // setPreviewImage(feedback?.url || null);
        } catch (error) {
          console.error('Error fetching feedback:', error);
          message.error('Có lỗi xảy ra khi tải thông tin phản hồi.');
        }
      };

      fetchFeedbackById();
    }
  }, [feedbackId]);

  // Xóa hàm handleFileChange nếu không cần thiết
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        // Có thể bỏ biến previewImage
        // setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imgName || !selectedSubCategory || !description) {
      message.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!feedbackId) { 
      message.error('Không thể cập nhật vì thiếu ID.');
      return;
    }
    
    const formData = {
      nameFeedback: imgName, 
      description: description, 
      subCategoryID: selectedSubCategory,
      images: file ? file : undefined
    }

    setLoading(true);

    try {
      const result = await updateFeedback(feedbackId, formData);
      console.log("result:::", result); 
      message.success('Cập nhật hình ảnh thành công!');
      onUpdateComplete();
      onClose();
    } catch (error) {
      console.error('Error updating feedback:', error);
      message.error('Có lỗi xảy ra khi cập nhật hình ảnh.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Chỉnh sửa phản hồi"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      confirmLoading={loading}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          placeholder="Tên hình ảnh"
          value={imgName}
          onChange={(e) => setImgName(e.target.value)}
        />
        <Input.TextArea
          placeholder="Mô tả hình ảnh"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Select
          placeholder="Chọn danh mục con"
          style={{ width: '100%' }}
          value={selectedSubCategory}
          onChange={(value) => setSelectedSubCategory(value)}
        >
          {subCategories.length > 0 ? (
            subCategories.map((subCategory) => (
              <Select.Option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option disabled>Không có danh mục con nào</Select.Option>
          )}
        </Select>
        
        {/* Nút để tải lên hình ảnh */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ marginTop: '10px' }} 
        />

        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
}
