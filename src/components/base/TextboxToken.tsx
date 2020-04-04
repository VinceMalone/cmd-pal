// TODO
/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/class-name-casing */

import * as React from 'react';
import { useMeasure } from 'react-use';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';
import { Token as TokenBox } from '../../types/Token';

import { gapProp } from './TokenField';
import { useTextboxTokenProps } from './useMoveThisSomewhere';

const Token = styled.div`
  box-sizing: border-box;
  display: inline-block;
  max-width: 100%;
  position: relative;
  padding: var(${gapProp});
`;

const TextValue = styled.div`
  pointer-events: none;
  position: absolute;
  white-space: pre;
`;

const Textbox = styled.input`
  background: none;
  border: none;
  box-sizing: content-box;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  max-width: 100%;
  outline: none;
  padding: 0;
  text-decoration: inherit;
  text-indent: inherit;
  text-shadow: inherit;
  text-transform: inherit;
  word-spacing: inherit;
`;

interface TextboxTokenComponentProps {
  children?: React.ReactNode;
}

export type TextboxTokenComponent = React.ComponentType<
  TextboxTokenComponentProps
>;

type HtmlInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

export interface Todo_TextboxTokenProps extends HtmlInputProps {
  as?: TextboxTokenComponent;
  focused?: boolean;
  value: string;
}

export const Todo_TextboxToken = React.forwardRef<
  HTMLInputElement,
  Todo_TextboxTokenProps
>(({ as, focused = false, value, ...props }, ref) => {
  const TextboxTokenComponent = useComponent('TextboxToken', as);
  const [valueRef, valueRect] = useMeasure();

  return (
    <Token as={TextboxTokenComponent}>
      <TextValue
        aria-hidden="true"
        ref={valueRef}
        style={{
          opacity: focused ? '0' : '1',
        }}
      >
        {value}
      </TextValue>
      <Textbox
        {...props}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        ref={ref}
        spellCheck={false}
        style={{
          opacity: focused ? '1' : '0',
          width: `calc(2ch + ${Math.ceil(valueRect.width) + 2}px)`,
        }}
        type="text"
        value={value}
      />
    </Token>
  );
});

Todo_TextboxToken.displayName = 'TextboxToken';

//

export interface TextboxTokenProps
  extends Omit<Todo_TextboxTokenProps, 'onChange' | 'onSubmit'> {
  onArrowDown?(evt: React.KeyboardEvent<HTMLElement>): void;
  onArrowUp?(evt: React.KeyboardEvent<HTMLElement>): void;
  onChange(value: string): void;
  onPageDown?(evt: React.KeyboardEvent<HTMLElement>): void;
  onPageUp?(evt: React.KeyboardEvent<HTMLElement>): void;
  onSelect(): void;
  onSubmit(tokens: readonly TokenBox[]): void;
  value: string;
}

export const TextboxToken: React.FC<TextboxTokenProps> = props => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const moreprops = useTextboxTokenProps(props, inputRef);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return <Todo_TextboxToken {...props} {...moreprops} ref={inputRef} />;
};
