'use client'

import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const StyledModalContent = styled.div`
  .modal-body {
    padding: 1rem;

    .modal-body-content{
      .form-control, .form-select {
        width: 100%;
        padding: 0.375rem 0.75rem;
        margin-bottom: 1rem;
        margin-top: .5rem;
        border: 1px solid var(--color-border-input);
        border-radius: 0.5rem;
      }

      .form-control{
        .upload-content{
          .upload-label{
              text-align: center;
              width: 100%;
              height: 100%;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 700;
              color: #002c7b;
              padding: 15px;
              cursor: pointer;
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              -ms-flex-align: center;
              -webkit-box-align: center;
            
          }
        }
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #e9ecef;
    gap: 1rem;

    .btn-cancel{
      padding: .5rem;
      border-radius: 6px;
      width: auto;
      background-color: #858796;
      color: var(--color-white);
      &:hover{
        opacity: 0.8;
      }
    }

    .btn-add{
      padding: .5rem;
      border-radius: 6px;
      width: auto;
      background-color: #8ca4ea;
      color: var(--color-white);
      &:hover{
        opacity: 0.8;
      }
    }
  }
`;

interface ModalCreateComponentProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ModalCreateComponent({ isVisible, onClose }: ModalCreateComponentProps) {
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="THÊM MỚI HÌNH ẢNH"
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-body">
          <form encType="multipart/form-data">
            <div className='modal-body-content'>
              <label htmlFor="img" className="form-label">Tên hình ảnh</label>
              <input type="text" className="form-control" id="img" name="imgName" />

              <label htmlFor="cate" className="form-label">Chọn danh mục</label>
              <select id="cate" className="form-select" name="cate">
                  <option >Hút Mỡ Bụng</option>
                  <option >Nâng mông mỡ tự thân</option>
              </select>

              <label htmlFor="descrip" className="form-label">Mô tả</label>
              <textarea className="form-control" id="descrip" rows={5} name="des"></textarea>

              <div className="form-control">
                <input type="file" id='upload' hidden/>
                <div className="upload-content">
                  <label htmlFor="upload" className="upload-label">
                    <span>Kéo và thả file ảnh</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
    
        <div className="modal-footer">
          <button className='btn-cancel' onClick={handleCancel}>Hủy bỏ</button>
          <button className='btn-add'>Thêm</button>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
