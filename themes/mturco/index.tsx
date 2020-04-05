import styled from 'styled-components';

import { OptionProps } from '../../src/components/base/Option';

export const components = {
  Dialog: styled.div`
    --primary: rgb(15, 124, 179);
    --primary-translucent: rgba(15, 124, 179, 0.25);
    --accent: rgb(255, 92, 97);
    --accent-translucent: rgba(255, 92, 97, 0.25);
    --bg-3: #202020;
    --bg-4: #262626;
    --text: #fff;
    --text-inverse: #000;
    --radius-lg: 0.5rem;
    --radius-sm: 0.125rem;
    --mark: var(--accent);

    background-color: var(--bg-4);
    border-radius: var(--radius-lg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    padding-bottom: 1rem;
  `,

  Mark: styled.mark`
    background-color: transparent;
    color: inherit;
    box-shadow: 0 1px 0 var(--mark);
  `,

  Option: styled.div<OptionProps>`
    border-radius: var(--radius-sm);
    padding: 0.25rem;

    &:hover {
      background-color: var(--bg-3);
    }

    &[aria-selected='true'] {
      background-color: var(--accent);
      background-color: var(--accent-translucent);
      box-shadow: 0 0 0 1px var(--accent) inset;
      outline: 0;
      --mark: var(--text);
    }
  `,

  Token: styled.button`
    background-color: var(--primary);
    background-color: var(--primary-translucent);
    border: 0;
    border-radius: 0.125rem;
    box-shadow: 0 0 0 1px var(--primary) inset;
    color: var(--text);
    font-size: 0.875rem;
    margin: 3px;
    padding: 0.25rem 0.5rem;
  `,

  TokenField: styled.div`
    background-color: #323232;
    border-radius: 0.5rem;
    margin: 0 0 1rem;
    padding: 0.375rem;
  `,

  TextboxToken: styled.div`
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    font-size: 0.875rem;
    margin: 3px;
    padding: 0.25rem 0.5rem;
  `,
};

export const theme = {
  maxWidth: '37.5rem',
  offsetTop: '2rem',
  offsetSides: '2rem',
  zIndex: 999999,
};
