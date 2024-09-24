import { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';
const ButtonSubmitStyled = styled.button``;

export function ButtonSubmit(props: HtmlHTMLAttributes<HTMLButtonElement>) {
  return <ButtonSubmitStyled {...props}></ButtonSubmitStyled>;
}

