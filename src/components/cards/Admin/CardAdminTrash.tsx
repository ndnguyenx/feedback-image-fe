import React from 'react';
import { IFeedBack } from '@/interfaces/models';
import { Button } from 'antd';
import Image from 'next/image'; // Import Image từ next/image
import './style.scss';

interface CardAdminTrashProps {
  image: IFeedBack;
  onRestore: (id: string) => void;
  onHardDelete: (id: string) => void; // Thêm prop cho xóa vĩnh viễn
}

export default function CardAdminTrash({ image, onRestore, onHardDelete }: CardAdminTrashProps) {
  return (
    <div className="card-container">
      {/* Thay thế <img> bằng <Image> */}
      <Image 
        alt={image?.nameFeedback} 
        src={image?.url} 
        width={300}  // Bạn có thể thay đổi kích thước này
        height={200} // Tùy vào yêu cầu cụ thể
        className="card-image" 
      />
      <div className="card-content">
        <h6 className="card-title">{image?.nameFeedback}</h6>
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
