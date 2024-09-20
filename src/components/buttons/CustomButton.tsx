'use client'

import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

interface StyledButtonProps {
  hoverColor?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  &:hover {
    color: white !important;
    background-color: ${(props) => props.hoverColor || 'transparent'} !important;
  }
`;

interface CustomButtonProps {
  danger?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  hoverColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ danger, icon, children, hoverColor }) => {
  return (
    <StyledButton danger={danger} icon={icon} hoverColor={hoverColor}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
