'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Select, message } from 'antd';
import { ISubCategory } from '@/interfaces/models';
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import { createFeedback } from '@/apis/feedback/feedback.apis';

interface CreateFeedbackModalProps {
  isVisible: boolean;
  onClose: () => void;
  onUploadComplete: (newImage: any) => void;
}

export default function CreateFeedbackModal({
  isVisible,
  onClose,
  onUploadComplete,
}: CreateFeedbackModalProps) {
  const [imgName, setImgName] = useState('');
  const [description, setDescription] = useState('');
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!imgName || !selectedSubCategory || !description || !file) {
      message.error('Vui lòng điền đầy đủ thông tin và chọn hình ảnh.');
      return;
    }

    const formData = new FormData();
    formData.append('nameFeedback', imgName);
    formData.append('description', description);
    formData.append('subCategoryID', selectedSubCategory);
    formData.append('images', file);

    try {
      const result = await createFeedback(formData);
      message.success('Thêm hình ảnh thành công!');
      onUploadComplete(result.data);
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Có lỗi xảy ra khi thêm hình ảnh.');
    }
  };

  return (
    <Modal title="Tạo phản hồi" visible={isVisible} onCancel={onClose} footer={null}>
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
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          style={{ marginTop: '10px' }} 
        />
        {previewImage && (
          <div style={{ maxHeight: '400px', overflowY: 'auto', marginTop: '10px' }}>
            <img 
              src={previewImage} 
              alt="Preview" 
              style={{ width: '100%', height: 'auto' }} 
            />
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button 
          type="primary" 
          onClick={handleSubmit}
        >
          Thêm
        </Button>
      </div>
    </Modal>
  );
}
