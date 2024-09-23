'use client';
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import CategoryNav from "./feedback-nav/FeedbackNav";
import CategoryItem from "./feedback-item/FeedbackItem";
import { IFeedBack } from '@/interfaces/models';
import { getCategories } from '@/apis/category/category.apis'; // Hàm lấy danh sách danh mục
import { getFeedbacks } from '@/apis/feedback/feedback.apis'; // Hàm lấy phản hồi

const CategoryStyled = styled.div<{ productCount: number }>`
  .category-wrapper {
    padding: 1rem;
    column-gap: 1rem;

    @media (min-width: 375px) {
      column-count: 1;
    }

    @media (min-width: 590px) and (max-width: 969px) {
      column-count: 2;
    }

    @media (min-width: 970px) and (max-width: 1199px) {
      column-count: 3;
    }

    @media screen and (min-width: 1200px) {
      column-count: 5;
    }
  }
`;

export function Category() {
  const [filteredProducts, setFilteredProducts] = useState<IFeedBack[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData.map(cat => cat.name));

        const feedbackItems = await getFeedbacks();
        setFilteredProducts(feedbackItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = async (item: string) => {
    try {
      const feedbackItems = await getFeedbacks(item === 'Tất cả' ? undefined : item);
      setFilteredProducts(feedbackItems);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  return (
    <CategoryStyled productCount={filteredProducts.length}>
      <CategoryNav items={['Tất cả', ...categories]} onItemClick={handleItemClick} />
      <div className="category-wrapper">
        {filteredProducts.map((product) => (
          <CategoryItem
            key={product._id}
            name={product.nameFeedback} // Tên phản hồi
            // type={product.CategoryID.name} // Tên danh mục
            image={product.url} // URL hình ảnh
            description={product.description} // Mô tả
          />
        ))}
      </div>
    </CategoryStyled>
  );
}
