import React from 'react';
import { IFeedBack } from '@/interfaces/models';
import { Button } from 'antd';
import './style.scss';

interface CardAdminTrashProps {
  image: IFeedBack;
  onRestore: (id: string) => void;
  onHardDelete: (id: string) => void; // Thêm prop cho xóa vĩnh viễn
}

export default function CardAdminTrash({ image, onRestore, onHardDelete }: CardAdminTrashProps) {
  return (
    <div className="card-container">
      <img alt={image?.nameFeedback} src={image?.url} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{image?.nameFeedback}</h3>
        <p className="card-description">{image?.description}</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Button type="primary" onClick={() => onRestore(image._id)}>
            Khôi Phục
          </Button>
          <Button type="default" onClick={() => onHardDelete(image._id)}>
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}
