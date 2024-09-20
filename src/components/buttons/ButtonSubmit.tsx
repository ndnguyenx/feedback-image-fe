import { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';
import { useFormStatus } from 'react-dom'
const ButtonSubmitStyled = styled.button``;

interface IProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  $someArg: string;
}

export function ButtonSubmit({ $someArg, ...props }: IProps) {
  return <ButtonSubmitStyled {...props}></ButtonSubmitStyled>;
}

// function Exp() {
//   return <ButtonSubmit $someArg=''></ButtonSubmit>;
// }
