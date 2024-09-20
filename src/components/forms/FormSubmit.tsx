import { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';

const FormSubmitStyled = styled.form``;

interface IProps extends HtmlHTMLAttributes<HTMLFormElement> {}

export function FormSubmit({ ...props }: IProps) {
  return <FormSubmitStyled {...props}></FormSubmitStyled>;
}
