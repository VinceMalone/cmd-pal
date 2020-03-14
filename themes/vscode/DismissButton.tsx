import * as React from 'react';
import styled, { css } from 'styled-components';

const textReset = css`
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-indent: inherit;
  text-shadow: inherit;
  text-transform: inherit;
  word-spacing: inherit;
`;

const ButtonNormalized = styled.button`
  ${textReset}
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  cursor: default;
  display: inline-flex;
  justify-content: center;
  margin: 0;
  outline: none;
  padding: 0;
  text-align: center;

  /* IconButton */
  height: 1em;
  width: 1em;
`;

const SvgIcon = styled.svg`
  --size: 0.8333333333em;
  display: block;
  fill: currentColor;
  max-height: var(--size);
  max-width: var(--size);
  width: var(--size);
`;

type ElementProps = React.RefAttributes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface DismissButtonProps extends ElementProps {
  'aria-label': string;
}

export const DismissButton = React.forwardRef<
  HTMLButtonElement,
  DismissButtonProps
>(({ type = 'button', ...props }, ref) => (
  <ButtonNormalized {...props} ref={ref} type={type}>
    <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SvgIcon>
  </ButtonNormalized>
));

DismissButton.displayName = 'DismissButton';
