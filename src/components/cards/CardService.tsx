import { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';

const CartServiceStyled = styled.div``;

interface IProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export function CartService({ ...props }: IProps) {
  return <CartServiceStyled {...props}></CartServiceStyled>;
}
