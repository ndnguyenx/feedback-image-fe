'use client'
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { IoMdClose } from "react-icons/io";
import logo from "@/assets/images/logo-text.png";
import axios from 'axios';


const CategoryItemStyled = styled.div`
position: relative;
width: auto;
margin-bottom: 1rem;
border: 1px solid #ddd;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
cursor: pointer;
break-inside: avoid;
.item-img{
    width: 100%;
    height: 100%;
}
.item-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
    width: max-content;
    opacity: 0;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
}
&:hover .overlay{
    opacity: 0.7;
}
&:hover .item-info{
    opacity: 1;
}
`

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalContent = styled.div`
position: relative;
background-color: white;
width: 70%;
height: 100%;
max-height: 55rem;
border-radius: 0.3rem;
display: flex;
flex-direction: column;
overflow: hidden; 
.modal-header{
    display: flex;
    align-items: center;
    background-color: rgba(13, 110, 253, 0.8);
    padding: 10px;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 2; 
    &-title{
        color: white;
        margin-left: 1rem;
    }
    .modal-close{
        position: absolute;
        width: 1.875rem;
        height: 1.875rem;
        background-color: red;
        color: white;
        right: 1.25rem;
        cursor: pointer;
    }
}
.modal-body{
    text-align: center;
    max-height: 47.5rem;
    overflow-y: auto;
    height: 100%;
    padding-top: 2rem;
    display:flex;
    flex-direction: column;
    align-items: center;
    &-info{
        margin: 2rem 2rem 2rem 2rem;
        border-top: 1px solid rgb(52, 125, 208);
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    &-img{
        margin: 0 auto;
    }
}
.modal-footer{
    border-top: 1px solid #dee2e6;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem;
}
@media (min-width: 650px) and (max-width: 1600px) {
        height: 80%;
}
@media(max-width: 649px) {
        width: 85%;
        height: 80%;
}
@media (min-width: 620px) and (max-width: 800px) {
        .modal-body-img{
            width: 400px;
            height: 400px;
        }
}
@media(max-width: 619px) {
    .modal-body-img{
            width: 300px;
            height: 300px;
        }
}
`

interface IProps {
  name: string;
  type: string;
}

function CategoryItem({ name, type }: IProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState('');  // Chỉ cần lưu một ảnh

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get('https://api.pexels.com/v1/search', {
                    headers: {
                        Authorization: 'Sx0xAOdJRnZjEEhXMSPhUSD5S5ERY3yd3rCcOJoU1yumWMbC7M7sdQml',
                    },
                    params: {
                        query: type,
                        per_page: 1,  // Chỉ lấy 1 ảnh
                    }
                });
                // Cập nhật state với một ảnh duy nhất
                setImage(response.data.photos[0].src.medium);
            } catch (error) {
                console.error('Error fetching image from Pexels:', error);
                // Nếu có lỗi, đặt ảnh mặc định
                setImage('https://example.com/default-image.jpg');
            }
        };
        fetchImage();
    }, [type]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return ( 
    <>
        <CategoryItemStyled onClick={openModal}>
            {image && (
                <img className='item-img' src={image} alt='Pexels Image' />
            )}
            <div className="overlay"></div>
            <div className='item-info'>
                <p>{name}</p>
                <p>Type: {type}</p>
            </div>
        </CategoryItemStyled>
        {isModalOpen && (
            <ModalWrapper onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h6 className='modal-header-title'>CHI TIẾT HÌNH ẢNH</h6>
                    <IoMdClose className='modal-close' onClick={closeModal} />
                </div>
                <div className='modal-body'>
                    {image && (
                        <div className='modal-image'>
                            <img src={image} alt='Pexels Image' />
                        </div>
                    )}
                    <div className='modal-body-info'>
                        <h6>Thông tin chi tiết</h6>
                        <p>{name}</p>
                        <p>Type: {type}</p>
                    </div>
                </div>
            </ModalContent>
            </ModalWrapper>
        )}
    </>
    );
}

export default CategoryItem;