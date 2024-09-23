import React from 'react';
import { IFeedBack } from '@/interfaces/models';
import { Button } from 'antd';
import './style.scss';

interface CardAdminTrashProps {
  image: IFeedBack;
  onRestore: (id: string) => void;
}

export default function CardAdminTrash({ image, onRestore }: CardAdminTrashProps) {
  return (
    <div className="card-container">
      <img alt={image?.nameFeedback} src={image?.url} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{image?.nameFeedback}</h3>
        <p className="card-description">{image?.description}</p>
        <Button type="primary" onClick={() => onRestore(image._id)}>
          Khôi Phục
        </Button>
      </div>
    </div>
  );
}
