'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, message } from 'antd';
import { IFeedBack, ISubCategory } from '@/interfaces/models';
import { getFeedbacks, updateFeedback } from '@/apis/feedback/feedback.apis';
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';

interface EditDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  feedbackId: string | null;
  onUpdateComplete: () => void;
}

const { Option } = Select;

export default function EditDashboardItem({ isVisible, onClose, feedbackId, onUpdateComplete }: EditDashboardItemProps) {
  const [imgName, setImgName] = useState('');
  const [description, setDescription] = useState('');
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (feedbackId) {
        const feedbacks = await getFeedbacks();
        const foundFeedback = feedbacks.find(fb => fb._id === feedbackId);
        if (foundFeedback) {
          setImgName(foundFeedback.nameFeedback);
          setDescription(foundFeedback.description);
          setSelectedSubCategory(foundFeedback.subCategoryID);
        }
      }
    };

    const fetchSubCategories = async () => {
      try {
        const subCategories = await getAllSubCategories();
        setSubCategories(subCategories);
      } catch (error) {
        console.error('Error fetching sub-categories:', error);
        message.error('Có lỗi xảy ra khi lấy danh mục con.');
      }
    };

    fetchFeedback();
    fetchSubCategories();
  }, [feedbackId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imgName || !selectedSubCategory || !description) {
      message.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const formData = new FormData();
    formData.append('nameFeedback', imgName);
    formData.append('description', description);
    formData.append('subCategoryID', selectedSubCategory);
    if (file) {
      formData.append('images', file);
    }

    // Chuyển đổi formData thành một đối tượng thông thường để log
    const dataToLog: any = {};
    formData.forEach((value, key) => {
      dataToLog[key] = value;
    });
    console.log('formData:', dataToLog);

    try {
      await updateFeedback(feedbackId, formData);
      message.success('Cập nhật thành công!');
      onUpdateComplete();
      onClose();
    } catch (error) {
      console.error('Error updating feedback:', error);
      message.error('Có lỗi xảy ra khi cập nhật phản hồi.');
    }
  };

  return (
    <Modal title="Sửa Phản Hồi" visible={isVisible} onCancel={onClose} footer={null}>
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
            <Option key={subCategory._id} value={subCategory._id}>
              {subCategory.name}
            </Option>
          ))
        ) : (
          <Option disabled>Không có danh mục con nào</Option>
        )}
      </Select>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={{ marginTop: '10px' }} 
      />
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Cập nhật
      </Button>
    </Modal>
  );
}
