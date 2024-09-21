'use client'
import React, { useState, useEffect } from 'react';
import { Modal, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IFeedBack } from '@/interfaces/models';

interface EditImageProps {
  visible: boolean;
  onClose: () => void;
  feedback: IFeedBack;
  onSave: (updatedFeedback: IFeedBack) => void;
}

export default function EditImage({
  visible,
  onClose,
  feedback,
  onSave,
}: EditImageProps) {
  const [imgName, setImgName] = useState(feedback.imgName);
  const [description, setDescription] = useState(feedback.description);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (info: any) => {
    setFile(info.file);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('nameFeedback', imgName);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`http://localhost:3006/api/v1/feedback/${feedback._id}`, {
        method: 'PUT',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        message.success('Feedback updated successfully');
        onSave(result.data);
        onClose();
      } else {
        message.error('Failed to update feedback');
      }
    } catch (error) {
      message.error('An error occurred while updating feedback');
    }
  };

  return (
    <Modal title="Edit Feedback" visible={visible} onCancel={onClose} footer={null}>
      <Input
        placeholder="Tên hình ảnh"
        value={imgName}
        onChange={(e) => setImgName(e.target.value)}
      />
      <Input.TextArea
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Upload
        beforeUpload={() => false} // Prevent automatic upload
        onChange={handleFileChange}
      >
        <Button icon={<UploadOutlined />}>Chọn hình ảnh mới</Button>
      </Upload>
      <Button type="primary" onClick={handleSave}>
        Lưu thay đổi
      </Button>
    </Modal>
  );
}
