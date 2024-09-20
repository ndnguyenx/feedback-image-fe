'use client'
import styled, {css} from "styled-components";
import React,{ useState, useEffect } from "react";
import CategoryNav from "./categoryNav/CategoryNav";
import CategoryItem from "./categoryItem/CategoryItem";



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
`

interface Product {
  name: string;
  type: string;
}

const products: Product[] = [
  { name: 'Product 1', type: 'Hút mỡ' },
  { name: 'Product 2', type: 'Nâng mông' },
  { name: 'Product 3', type: 'Hút mỡ' },
  { name: 'Product 4', type: 'Nâng ngực' },
  { name: 'Product 5', type: 'Nâng mông' },
  { name: 'Product 6', type: 'Nâng ngực' },
  { name: 'Product 7', type: 'Trẻ hóa cô bé' },
  { name: 'Product 8', type: 'Hút mỡ' },
  { name: 'Product 9', type: 'Cấy mỡ'},
  { name: 'Product 10', type: 'Hút mỡ' },
  { name: 'Product 11', type: 'Nâng mông' },
  { name: 'Product 12', type: 'Nâng mũi' },
  { name: 'Product 13', type: 'Nâng mũi' },
  { name: 'Product 14', type: 'Cấy mỡ' },
  { name: 'Product 15', type: 'Nâng mông' },
  { name: 'Product 16', type: 'Hút mỡ' },
  { name: 'Product 17', type: 'Hút mỡ' },
  { name: 'Product 18', type: 'Hút mỡ' },
  { name: 'Product 19', type: 'Hút mỡ' },
  { name: 'Product 20', type: 'Hút mỡ' },
];



export function Category() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleItemClick = (item: string) => {
    if (item === 'Tất cả') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.type === item);
      setFilteredProducts(filtered);
    }
  };



  return ( 
    <CategoryStyled productCount={filteredProducts.length}>
      <CategoryNav items={['Tất cả', 'Hút mỡ', 'Nâng mông', 'Nâng ngực', 'Cấy mỡ','Nâng mũi','Trẻ hóa cô bé', 'Tẩy trắng', 'Tấy tế bào chết', 'Tắm thảo dược']} onItemClick={handleItemClick} />
      <div className="category-wrapper">
        {filteredProducts.map((product, index) => (
          <CategoryItem key={index} name={product.name} type={product.type} />
        ))}
      </div>
    </CategoryStyled>
   );
}
