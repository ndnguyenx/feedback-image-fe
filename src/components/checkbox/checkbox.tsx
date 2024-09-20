'use client'

import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styled from 'styled-components';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }

  .ant-checkbox + span {
    margin-left: 0.5rem;
  }
`;

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onChange }) => {
  const handleChange = (e: CheckboxChangeEvent) => {
    onChange(e.target.checked);
  };

  return (
    <CheckboxContainer>
      <Checkbox checked={checked} onChange={handleChange}>
        {label}
      </Checkbox>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
