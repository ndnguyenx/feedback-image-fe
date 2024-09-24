"use client";
import React, { useState } from "react";
import { Modal, message } from "antd";
import styled from "styled-components";

const StyledModalContent = styled.div`
  .modal-body {
    padding: 1rem;
    margin: 1rem auto;
    .form {
      border: 1px solid #ccc;
      .input-group {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: stretch;
        width: 100%;

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
  }
`;

interface AddCategoryParentProps {
  isVisible: boolean;
  onClose: () => void;
  onAddCategory: (categoryData: { name: string }, resetForm: () => void) => void;
}

export default function AddCategoryParent({ isVisible, onClose, onAddCategory }: AddCategoryParentProps) {
  const [name, setName] = useState("");

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
    setName("");
  };

  const handleCategoryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      message.error("Tên danh mục không được để trống.");
      return;
    }
    onAddCategory({ name }, () => setName("")); // Reset form sau khi thêm
  };

  return (
    <Modal
      title="Thêm Danh Mục Chính"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <StyledModalContent>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="input-group">
                <span className="input-group-title">Tên danh mục chính</span>
                <input
                  type="text"
                  className="input-group-text"
                  value={name}
                  onChange={handleCategoryNameChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCancel}>
                Hủy bỏ
              </button>
              <button className="btn-add" type="submit">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </StyledModalContent>
    </Modal>
  );
}
