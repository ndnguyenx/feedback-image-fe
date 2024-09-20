'use client'

import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import Image from 'next/image';
import logo from "@/assets/images/logo.png";

const StyledModalContent = styled.div`
  .modal-body {
    padding: 1rem;

    .modal-body-content {
      display: flex;
      flex-direction: column;
      
      .form-control, .form-select {
        width: 100%;
        padding: 0.375rem 0.75rem;
        margin-bottom: 1rem;
        margin-top: .5rem;
        border: 1px solid var(--color-border-input);
        /* border-radius: 0.5rem; */
      }

      .form-control-img {
        height: auto;
        max-height: 30rem;
        overflow-y: auto;
        
        .image-detail {
          width: 100%;
          height: auto;
          padding: 1rem;
        }
      }
    }
  }

  .modal-footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #e9ecef;
    gap: 1rem;

    .btn-cancel, .btn-edit {
      padding: .5rem 1rem;
      border-radius: 6px;
      width: auto;
      background-color: #4e73df;
      color: var(--color-white);
      border: none;
      cursor: pointer;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }

      &.btn-cancel {
        background-color: #858796;
      }
    }
  }

  @media (max-width: 768px) {
    .modal-body {
      padding: 0.5rem;
    }

    .modal-footer {
      flex-direction: column;
      align-items: stretch;

      .btn-cancel, .btn-edit {
        width: 100%;
      }
    }
  }
  
  @media (max-width: 480px) {
    .modal-body {
      .modal-body-content {
        .form-control, .form-select {
          padding: 0.25rem 0.5rem;
        }

        .form-control-img {
          max-height: 20rem;
        }
      }
    }
  }
`;

interface ModalEditComponentProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ModalEditComponent({ isVisible, onClose }: ModalEditComponentProps) {
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title="CHỈNH SỬA HÌNH ẢNH"
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

              <div className="form-control-img">
                <Image src={logo} className='image-detail' alt='image detail'/>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button className='btn-cancel' onClick={handleCancel}>Hủy bỏ</button>
          <button className='btn-edit'>Sửa</button>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
