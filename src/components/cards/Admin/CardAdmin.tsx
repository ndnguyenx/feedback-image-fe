import React from 'react';
import { Card } from 'antd';
import { IFeedBack } from '@/interfaces/models';

interface CardAdminProps {
  image: IFeedBack;
}

export default function CardAdmin({ image }: CardAdminProps) {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={image?.nameFeedback} src={image?.url} style={{ objectFit: 'cover', height: '150px' }} />}
    >
      <Card.Meta 
        title={image?.nameFeedback} 
        description={image?.description} 
      />
    </Card>
  );
}
