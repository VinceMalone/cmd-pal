import styled, { css } from 'styled-components';

export const components = {
  Dialog: styled.div`
    background-color: rgb(206, 208, 207);
    border-left-color: rgb(255, 255, 255);
    border-top-color: rgb(255, 255, 255);
    border-right-color: rgb(5, 6, 8);
    border-bottom-color: rgb(5, 6, 8);
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, 0.35) 4px 4px 10px 0px,
      rgb(223, 224, 227) 1px 1px 0px 1px inset,
      rgb(136, 140, 143) -1px -1px 0px 1px inset;
    color: rgb(5, 6, 8);
    font-family: 'MS Sans Serif';
    font-size: 10px;
    padding: 2px;
  `,

  Message: styled.p`
    line-height: 33px;
    margin-right: 2px;
    margin-bottom: 4px;
    font-weight: bold;
    color: rgb(255, 255, 255);
    padding: 0 8px;
    background: linear-gradient(to right, rgb(0, 0, 128), rgb(16, 52, 166));
    margin: 0;
  `,

  Hint: styled.p`
    /* color: rgb(255, 255, 255); */
    font-weight: bold;
    line-height: 33px;
    margin: 0;
    padding: 0 8px;

    kbd {
      font-family: inherit;
    }
  `,

  Mark: styled.mark``,

  OptionList: styled.div`
    border-left-color: rgb(136, 140, 143);
    border-top-color: rgb(136, 140, 143);
    border-right-color: rgb(255, 255, 255);
    border-bottom-color: rgb(255, 255, 255);
    border-style: solid;
    border-width: 2px;
    padding: 2px;
    margin: 8px;
  `,

  Option: styled.div`
    background-color: white;
    padding: 0 8px;
    line-height: 31px;
    color: rgb(5, 6, 8);

    &[aria-selected='true'] {
      background: rgb(0, 0, 128);
      color: rgb(255, 255, 255);
      outline: none;
    }
  `,

  MultiOptionPromptCheckbox: styled.div<{ checked: boolean }>`
    background-color: rgb(255, 255, 255);
    border-left-color: rgb(136, 140, 143);
    border-top-color: rgb(136, 140, 143);
    border-right-color: rgb(255, 255, 255);
    border-bottom-color: rgb(255, 255, 255);
    border-style: solid;
    border-width: 2px;
    box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 10px inset;
    box-sizing: border-box;
    display: inline-block;
    height: 20px;
    margin-inline-end: 8px;
    padding: 2px;
    position: relative;
    vertical-align: middle;
    width: 20px;

    &::before {
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
      content: '';
      width: calc(100% - 4px);
      height: calc(100% - 4px);
      border-left-color: rgb(5, 6, 8);
      border-top-color: rgb(5, 6, 8);
      border-right-color: rgb(223, 224, 227);
      border-bottom-color: rgb(223, 224, 227);
      pointer-events: none;
      /* box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 10px inset; */
      border-style: solid;
      border-width: 2px;
    }

    ${props =>
      props.checked &&
      css`
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 50%;
          top: calc(50% - 1px);
          width: 3px;
          height: 7px;
          transform: translate(-50%, -50%) rotate(45deg);
          border-style: solid;
          border-color: rgb(5, 6, 8);
          border-image: initial;
          border-width: 0px 3px 3px 0px;
        }
      `}
  `,

  Token: styled.button`
    background-color: rgb(206, 208, 207);
    border-left-color: rgb(255, 255, 255);
    border-top-color: rgb(255, 255, 255);
    border-right-color: rgb(5, 6, 8);
    border-bottom-color: rgb(5, 6, 8);
    border-style: solid;
    border-width: 2px;
    box-shadow: rgb(223, 224, 227) 1px 1px 0px 1px inset,
      rgb(136, 140, 143) -1px -1px 0px 1px inset;
    box-sizing: border-box;
    color: rgb(5, 6, 8);
    font: inherit;
    height: 35px;
    margin: var(--token-field-gap);
    padding: 0 8px;
  `,

  TokenField: styled.div`
    --token-field-gap: 2px;
    background-color: white;
    border-left-color: rgb(136, 140, 143);
    border-top-color: rgb(136, 140, 143);
    border-right-color: rgb(255, 255, 255);
    border-bottom-color: rgb(255, 255, 255);
    border-style: solid;
    border-width: 2px;
    color: black;
    margin: 8px;
  `,

  TextboxToken: styled.div`
    padding: 0 8px;
  `,
};

export const theme = {
  maxWidth: '37.5rem',
  offsetTop: '2rem',
  offsetSides: '2rem',
  zIndex: 999999,
};
