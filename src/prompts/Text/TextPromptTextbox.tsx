import * as React from 'react';

import { Textbox, TextboxProps } from '../../components/base/Textbox';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useTextPromptContext } from './context';

export interface TextPromptTextboxProps extends Pick<TextboxProps, 'as'> {}

export const TextPromptTextbox: React.FC<TextPromptTextboxProps> = ({ as }) => {
  const { initialValue, message, placeholder, submit } = useTextPromptContext();

  const inputRef = React.useRef<HTMLInputElement>(null);
  useAutoFocus(inputRef, true);

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    switch (evt.key) {
      case 'Enter':
        submit(inputRef.current?.value ?? '');
        break;
      case 'Tab':
        evt.preventDefault();
        break;
    }
  };

  return (
    <Textbox
      aria-label={message}
      as={as}
      defaultValue={initialValue}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
};
