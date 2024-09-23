import React from 'react';
import { Button } from 'antd';
import { IFeedBack } from '@/interfaces/models';
import './style.scss';

interface CardAdminProps {
  image: IFeedBack;
  onDelete: () => void; // Callback để xóa
  onEdit: () => void;   // Callback để sửa
}

export default function CardAdmin({ image, onDelete, onEdit }: CardAdminProps) {
  return (
    <div className="card-container">
      <img alt={image?.nameFeedback} src={image?.url} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{image?.nameFeedback}</h3>
        <p className="card-description">{image?.description}</p>
        <div className="card-actions">
          <Button onClick={onEdit} type="primary" style={{ marginRight: '1rem' }}>Sửa</Button>
          <Button onClick={onDelete} type="link">Xóa</Button>
        </div>
      </div>
    </div>
  );
}
