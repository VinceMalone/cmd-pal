import styled from 'styled-components';

import { Components } from '../../src/contexts/components/type';

/**
 * Every style is wrapped with `&&& { }` to combat some specificity issue
 * https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
 */

export const components: Partial<Components> = {
  Dialog: styled.div`
    &&& {
      background-color: white;
      border: 1px solid #f3f3f4;
      border-radius: 8px;
      color: #2a3742;
      display: flex;
      flex-direction: column;
      font-family: 'Helvetica Neue', sans-serif;
      padding: 32px 40px;
    }
  `,

  Header: styled.header`
    &&& {
      align-items: baseline;
      display: flex;
      gap: 16px;
      justify-content: space-between;
      margin-bottom: 8px;
    }
  `,

  Message: styled.p`
    &&& {
      margin: 0;
      font-weight: bold;
    }
  `,

  Hint: styled.p`
    &&& {
      font-size: smaller;
      margin: 0;
    }
  `,

  TokenField: styled.div`
    &&& {
      --token-height: 24px;
      --token-outside-space: 2px;
      background-color: #fbfbfb;
      border-radius: 8px;
      margin: 0 0 4px;
      padding: 8px;
    }
  `,

  Token: styled.button<{ focused: boolean }>`
    &&& {
      align-items: center;
      background-color: ${props =>
        props.focused ? 'rgba(255, 131, 149, 1)' : '#faecee'};
      border: 1px solid #ff8395;
      border-radius: calc(var(--token-height) / 2);
      box-sizing: border-box;
      color: inherit;
      cursor: pointer;
      display: inline-flex;
      font: inherit;
      line-height: normal;
      margin: var(--token-outside-space);
      min-height: var(--token-height);
      padding: 0 8px;
      vertical-align: middle;

      &::after {
        content: '⨉';
        display: inline-block;
        font-size: smaller;
        line-height: 1;
        margin-inline-start: 4px;
      }
    }
  `,

  TextboxToken: styled.div`
    &&& {
      box-sizing: border-box;
      height: var(--token-height);
      line-height: var(--token-height);
      margin: var(--token-outside-space);
      padding: 0;
      vertical-align: middle;
    }
  `,

  OptionList: styled.div`
    &&& {
      --horizontal-space: 10px;
      border: 1px solid #f3f3f4;
      border-radius: 8px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.03);
      box-sizing: border-box;
      padding: 8px 0;

      /* &::before {
        color: rgb(191, 191, 191);
        content: 'Suggestions';
        display: block;
        font-size: 12px;
        font-weight: bold;
        padding: 4px var(--horizontal-space);
        text-transform: uppercase;
      } */
    }
  `,

  Option: styled.div`
    &&& {
      background-color: ${props =>
        props['aria-selected'] ? 'rgba(255, 131, 149, 0.11)' : 'transparent'};
      box-sizing: border-box;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      outline: none;
      padding: calc((27px - 1em) / 2) var(--horizontal-space);
    }
  `,

  Mark: styled.mark`
    &&& {
      background-color: rgba(255, 131, 149, 1);
      color: inherit;
    }
  `,

  MultiOptionPromptCheckbox: styled.div<{ checked: boolean }>`
    &&& {
      display: none;
    }
  `,
};
