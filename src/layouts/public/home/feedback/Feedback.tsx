'use client';
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import CategoryNav from "./feedback-nav/FeedbackNav";
import CategoryItem from "./feedback-item/FeedbackItem";
import { IFeedBack } from '@/interfaces/models';
import { getCategories } from '@/apis/category/category.apis'; // Hàm lấy danh sách danh mục
import { getFeedbacks } from '@/apis/feedback/feedback.apis'; // Hàm lấy phản hồi
import { getAllSubCategories } from '@/apis/subCategory/subCategory.apis'; // Hàm lấy danh sách danh mục con

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
  const [subCategories, setSubCategories] = useState<{[key: string]: string}>({}); // Lưu subCategories theo id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData.map(cat => cat.name));

        const feedbackItems = await getFeedbacks();
        setFilteredProducts(feedbackItems);

        // Lấy danh sách danh mục con
        const subCategoriesData = await getAllSubCategories();
        const subCategoryMap = subCategoriesData.reduce((acc, subCat) => {
          acc[subCat._id] = subCat.name; // Giả sử subCat có id và name
          return acc;
        }, {} as {[key: string]: string});
        setSubCategories(subCategoryMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleItemClick = async (categoryName: string) => {
    try {
      const feedbackItems = await getFeedbacks();
      // Lọc feedbackItems dựa trên categoryName
      const filteredItems = categoryName === 'Tất cả'
        ? feedbackItems
        : feedbackItems.filter(item => item.category && item.category.name === categoryName); // Kiểm tra category có tồn tại

      setFilteredProducts(filteredItems);
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
            subCategory={product.subCategory ? product.subCategory.name : 'Chưa xác định'} // Hiển thị subCategory
            image={product.url} // URL hình ảnh
            description={product.description} // Mô tả
          />
        ))}
      </div>
    </CategoryStyled>
  );
}
