import React from 'react';
import { Button } from 'antd';
import { IFeedBack } from '@/interfaces/models';
import Image from 'next/image'; // Import từ next/image
import './style.scss';

interface CardAdminProps {
  image: IFeedBack; 
  onDelete: () => void; 
  onEdit: () => void;   
}

export default function CardAdmin({ image, onDelete, onEdit }: CardAdminProps) {
  if (!image) {
    return null; 
  }

  return (
    <div className="card-container">
      
      <Image 
        alt={image?.nameFeedback} 
        src={image?.url} 
        width={300} 
        height={200} 
        className="card-image" 
      />
      <div className="card-content">
        <h6 className="card-title">{image?.nameFeedback}</h6>
        <p className="card-description">{image?.description}</p>
        {image?.subCategory && image.subCategory.name && (
          <p className="card-subcategory">Danh mục con: {image.subCategory.name}</p>
        )}
        <div className="card-actions">
          <Button onClick={onDelete} type="primary" className="action-button delete-button">Xóa</Button>
          <Button onClick={onEdit} type="primary" className="action-button edit-button">Sửa</Button>
        </div>
      </div>
    </div>
  );
}
