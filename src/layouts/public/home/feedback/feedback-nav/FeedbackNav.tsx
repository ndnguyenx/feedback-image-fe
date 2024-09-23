'use client'
import React, { useState , useRef, useEffect , MouseEvent } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";

const CategoryNavStyled = styled.div`
margin: 32px auto 0px 32px;
padding-bottom: 16px;
display: flex;
align-items: center;
justify-content: center;
border-bottom: 2px solid rgb(22, 125, 208);
@media (max-width: 479px) {
    margin-left: 0;
}
.nav-arrow-left{
    margin-right: 1rem;
    width: 2.25rem;
    height: 2.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(52, 125, 208);
    &:hover{
        border-radius: 50%;
        background-color: rgb(52, 125, 208);
        color: white;
    }
}
.nav-arrow-right{
    margin-left: 1rem;
    width: 2.25rem;
    height: 2.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(52, 125, 208);
    &:hover{
        border-radius: 50%;
        background-color: rgb(52, 125, 208);
        color: white;
    }
}
.nav-list{
    display: flex;
    gap: 1rem;
    max-width: 34.5rem;
    overflow-x: auto;
    padding: 0;
    &-item{
        font-size: 1.125rem;
        padding: 0.625rem;
        white-space: nowrap;
        transition: border 0.2s linear;
        cursor: pointer;
        color: rgb(52, 125, 208);
        border: 0.125rem solid white;
        font-weight: 600;
    }
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .selected {
    border-bottom: 0.125rem solid rgb(52, 125, 208);
    }
    @media (min-width: 700px) and (max-width: 775px) {
        max-width: 29.5rem;
    }
    @media (min-width: 625px) and (max-width: 699px) {
        max-width: 25.5rem;
    }
    @media (min-width: 500px) and (max-width: 624px) {
        max-width: 20.5rem;
    }
    @media (min-width: 480px) and (max-width: 499px) {
        max-width: 18.5rem;
    }
    @media (max-width: 479px) {
        max-width: 10.5rem;
    }
}
`


interface Props {
    items: string[];
    onItemClick: (item: string) => void;
  }

function CategoryNav( {items, onItemClick}: Props ) {

    const navListRef = useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = useState(items[0] || '');
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeftValue, setScrollLeftValue] = useState(0);


    const handleMouseDown = (e: MouseEvent<HTMLUListElement>) => {
        if (navListRef.current) {
          setIsDragging(true);
          setStartX(e.pageX - navListRef.current.offsetLeft);
          setScrollLeftValue(navListRef.current.scrollLeft);
        }
    };
    
    const handleMouseLeave = () => {
        setIsDragging(false);
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    
    const handleMouseMove = (e: MouseEvent<HTMLUListElement>) => {
        if (!isDragging || !navListRef.current) return;
        e.preventDefault();
        const x = e.pageX - navListRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        navListRef.current.scrollLeft = scrollLeftValue - walk;
    };
    
    useEffect(() => {
        const navList = navListRef.current;
    
        if (navList) {
          navList.style.cursor = isDragging ? 'grabbing' : 'grab';
        }
    }, [isDragging]);
    
    
    
    const scrollLeft = () => {
        if (navListRef.current) {
        navListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (navListRef.current) {
        navListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const handleClick = (item: string) => {
        setSelectedItem(item);
        onItemClick(item);
    };

    return ( 
        <CategoryNavStyled >
            <div className='nav-arrow-left' onClick={scrollLeft}>
                <IoIosArrowBack/>
            </div>
            
            <ul className='nav-list' ref={navListRef} onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}>
                {items.map((item, index) => (
                    <div className={`nav-list-item ${item === selectedItem ? 'selected' : ''}`} key={index} onClick={() => handleClick(item)}>
                        {item}
                    </div>
                ))}
            </ul>
            
            <div className='nav-arrow-right'  onClick={scrollRight}>
                <IoIosArrowForward  />
            </div>
      </CategoryNavStyled>
     );
}

export default CategoryNav;
