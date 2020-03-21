import * as React from 'react';

import { CmdInput, CmdInputProps } from '../../components/CmdInput';
import { useComponents } from '../../contexts/components';
import { useAutoFocus } from '../../utils/useAutoFocus';

import { useTextPromptContext } from './context';

export interface TextPromptTextInputProps {
  as?: CmdInputProps['as'];
}

export const TextPromptTextInput: React.FC<TextPromptTextInputProps> = ({
  as: As,
}) => {
  const { Input } = useComponents();
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
    <CmdInput
      as={As ?? Input}
      defaultValue={initialValue}
      label={message}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
};
