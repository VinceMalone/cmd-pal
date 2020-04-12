import styled, { css } from 'styled-components';

import { Components } from '../../src/contexts/components/type';

export const components: Partial<Components> = {
  Dialog: styled.div`
    --primary: rgb(15, 124, 179);
    --primary-translucent: rgba(15, 124, 179, 0.25);
    --primary-translucent-hover: rgba(15, 124, 179, 0.35);
    --accent: rgb(255, 92, 97);
    --accent-translucent: rgba(255, 92, 97, 0.25);
    --accent-translucent-hover: rgba(255, 92, 97, 0.35);
    --bg-1: #202020;
    --bg-2: #262626;
    --text: #fff;
    --text-inverse: #000;
    --radius-lg: 0.5rem;
    --radius-sm: 0.125rem;
    --mark: var(--accent);

    background-color: var(--bg-2);
    border-radius: var(--radius-lg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    padding-bottom: 1rem;
  `,

  ConfirmPromptButton: styled.button<{ focused: boolean }>`
    background-color: rgba(255, 255, 255, 0.06);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
    border: 0;
    border-radius: 0.125rem;
    color: var(--text);
    font-size: 0.875rem;
    margin: 3px;
    padding: 0 1.5rem;
    height: 2.25rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.15) inset;
    }

    ${props =>
      props.focused &&
      css`
        background-color: var(--primary-translucent);
        box-shadow: 0 0 0 1px var(--primary) inset;
        outline: 0;

        &:hover {
          background-color: var(--primary-translucent-hover);
          box-shadow: 0 0 0 1px var(--primary) inset;
        }
      `}
  `,

  Header: styled.header`
    align-items: center;
    display: flex;
    gap: 0.75em;
    justify-content: space-between;
    padding: 0.5rem 0 1rem;
  `,

  Paragraph: styled.p`
    margin: 0;
  `,

  Hint: styled.p`
    cursor: default;
    font-size: smaller;
    margin: 0;
    text-align: end;
  `,

  Mark: styled.mark`
    background-color: transparent;
    color: inherit;
    box-shadow: 0 1px 0 var(--mark);
  `,

  MultiOptionPromptCheckbox: styled.span<{ checked: boolean }>`
    display: inline-flex;
    margin: 0 0.5rem 0 0.25rem;
    width: 0.875rem;
    height: 0.875rem;
    border-radius: var(--radius-sm);
    background-color: rgba(255, 255, 255, 0.95);

    ${props =>
      props.checked &&
      css`
        background-color: var(--accent);
      `}
  `,

  Option: styled.div`
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    padding: 0.25rem;

    &:hover {
      background-color: var(--bg-1);
    }

    &[aria-selected='true'] {
      background-color: var(--accent-translucent);
      box-shadow: 0 0 0 1px var(--accent) inset;
      outline: 0;
      --mark: var(--text);
    }
  `,

  OptionList: styled.div`
    margin-top: 1rem;
  `,

  Token: styled.button`
    background-color: var(--primary-translucent);
    border: 0;
    border-radius: 0.125rem;
    box-shadow: 0 0 0 1px var(--primary) inset;
    color: var(--text);
    font-size: 0.875rem;
    margin: 3px;
    padding: 0 0.5rem;
    height: 1.5rem;
  `,

  TokenField: styled.div`
    background-color: #323232;
    border-radius: 0.5rem;
    margin: 0;
    padding: 0.375rem;
  `,

  Textbox: styled.input`
    background-color: rgba(255, 255, 255, 0.1);
    border: 0;
    border-radius: var(--radius-sm) var(--radius-sm) 0 0;
    box-shadow: 0 -1px 0 rgba(255, 255, 255, 0.1) inset;
    color: var(--text);
    font-size: 1rem;
    padding: 0 0.625rem;
    height: 2.25rem;

    &:focus {
      outline: 0;
    }
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
