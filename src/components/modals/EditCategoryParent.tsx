import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import styled from "styled-components";

const StyledModalContent = styled.div`
  .modal-body {
    padding: 1rem;
    margin: 1rem auto;

    .input-group {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: stretch;
      width: 100%;
      border: 1px solid #ccc;

      &-title {
        width: 30%;
        padding: 0.5rem;
        text-align: center;
        background-color: #eaecf4;
      }

      &-text {
        width: 70%;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.5;
        border-radius: 0.2rem;
      }
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    border-top: 1px solid #e9ecef;
    gap: 1rem;

    .btn-cancel {
      padding: 0.5rem;
      border-radius: 6px;
      width: auto;
      background-color: #858796;
      color: var(--color-white);
      &:hover {
        opacity: 0.8;
      }
    }

    .btn-add {
      padding: 0.5rem;
      border-radius: 6px;
      width: auto;
      background-color: #8ca4ea;
      color: var(--color-white);
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

interface EditCategoryParentProps {
  isVisible: boolean;
  onClose: () => void;
  categoryId: string;
  categoryName: string;
}

export default function EditCategoryParent({
  isVisible,
  onClose,
  categoryId,
  categoryName,
}: EditCategoryParentProps) {
  const [name, setName] = useState(categoryName);

  useEffect(() => {
    setName(categoryName);
  }, [categoryName]);

  const handleCancel = () => {
    onClose();
    setName(categoryName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      message.error("Tên danh mục không được để trống.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3006/api/v1/category/${categoryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
  
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi cập nhật danh mục.');
      }
  
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
  
      message.success("Danh mục đã được cập nhật thành công!");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Có lỗi xảy ra khi cập nhật danh mục: ${error.message}`);
      } else {
        message.error('Có lỗi xảy ra khi cập nhật danh mục.');
      }
    }
  };
  
  return (
    <Modal
      title="Chỉnh Sửa Danh Mục Chính"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <StyledModalContent>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="input-group">
              <span className="input-group-title">Tên danh mục chính</span>
              <input
                type="text"
                className="input-group-text"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={handleCancel}>
              Hủy bỏ
            </button>
            <button className="btn-add" type="submit">
              Cập nhật
            </button>
          </div>
        </form>
      </StyledModalContent>
    </Modal>
  );
}
