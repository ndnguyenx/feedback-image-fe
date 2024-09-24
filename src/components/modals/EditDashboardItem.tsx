'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Select, message } from 'antd';
import { IFeedBack, ISubCategory } from '@/interfaces/models';
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis';
import { updateFeedback, getFeedbackById } from '@/apis/feedback/feedback.apis';

interface EditDashboardItemProps {
  isVisible: boolean;
  onClose: () => void;
  itemId?: string; // Thay đổi để truyền ID của item cần chỉnh sửa
  onUpdateComplete: (updatedItem: IFeedBack) => void;
}

export default function EditDashboardItem({
  isVisible,
  onClose,
  itemId,
  onUpdateComplete,
}: EditDashboardItemProps) {
  const [imgName, setImgName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | undefined>();
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const fetchedSubCategories = await getAllSubCategories();
        setSubCategories(fetchedSubCategories);
      } catch (error) {
        console.error('Error fetching sub-categories:', error);
        message.error('Có lỗi xảy ra khi lấy danh mục con.');
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      if (itemId) {
        try {
          const result = await getFeedbackById(itemId);
          
          // Kiểm tra xem result.data có tồn tại không
          if (result && result.data) {
            setImgName(result.data.nameFeedback);
            setDescription(result.data.description);
            setSelectedSubCategory(result.data.subCategory ? result.data.subCategory._id : undefined);
            
            console.log('Item data being edited:', result.data); // Console log dữ liệu của item
          } else {
            message.error('Không tìm thấy dữ liệu cho phản hồi này.');
          }
        } catch (error) {
          console.error('Error fetching feedback by ID:', error);
          message.error('Có lỗi xảy ra khi lấy dữ liệu phản hồi.');
        }
      }
    };

    fetchItemData();
  }, [itemId]);

  const handleSubmit = async () => {
    if (!imgName || !selectedSubCategory || !description) {
      message.error('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const formData = new FormData();
    formData.append('nameFeedback', imgName);
    formData.append('description', description);
    formData.append('subCategoryID', selectedSubCategory);

    // try {
    //   const result = await updateFeedback(itemId!, formData); 

    //   if (result && result.data) {
    //     message.success('Cập nhật thành công!');
    //     onUpdateComplete(result.data);
    //     onClose();
    //   } else {
    //     message.error('Không có dữ liệu trả về.');
    //   }
    // } catch (error) {
    //   console.error('Error updating feedback:', error);
    //   message.error('Có lỗi xảy ra khi cập nhật.');
    // }
  };

  return (
    <Modal title="Chỉnh sửa phản hồi" visible={isVisible} onCancel={onClose} footer={null}>
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
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button 
          type="primary" 
          onClick={handleSubmit}
        >
          Sửa
        </Button>
      </div>
    </Modal>
  );
}
