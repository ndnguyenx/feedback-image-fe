'use client'

import styled, { css, keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import React, { ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

const ButtonSimpleStyle = styled.button`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .5rem 1rem;
    border-radius: .5rem;
    color: var(--color-primary);
    font-weight: 600;
    background-color: transparent;
    border: 1px solid var(--color-primary);
    &:hover {
        cursor: pointer !important;
        /* box-shadow: 1px 2px 5px 0 var(--color-black); */
    }

    &:disabled {
        opacity: .8;
        cursor: not-allowed;
    }

    @media (max-width: 640px) {
        font-size: 14px;
    }

`;

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const spinAnimation = css`
    animation: ${spin} 1s linear infinite;
`;

const LoadingIcon = styled(AiOutlineLoading3Quarters) <{ isLoading?: boolean }>`
    ${({ isLoading }) => isLoading && spinAnimation}
    width: 24px;
    height: 24px;
`;

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string | React.ReactNode;
    isLoading?: boolean;
    icon?: IconType;
}

export default function ButtonSimple({ text, isLoading, icon: Icon, ...props }: IProps) {
    return (
        <ButtonSimpleStyle disabled={isLoading} {...props}>
            {isLoading ? <LoadingIcon isLoading={isLoading} /> : (
                <>
                    {Icon && <Icon />}
                    {text}
                </>
            )}
        </ButtonSimpleStyle>
    );
}
