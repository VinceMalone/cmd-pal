import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';

type HtmlInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement>;

interface TextboxComponentProps extends HtmlInputProps {}

const BaseTextbox = styled.input`
  box-sizing: border-box;
  width: 100%;
`;

export type TextboxComponent = React.ElementType<TextboxComponentProps>;

export interface TextboxProps extends HtmlInputProps {
  as?: TextboxComponent;
}

export const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(
  ({ as, ...props }, ref) => {
    const TextboxComponent = useComponent('Textbox', as);
    return <BaseTextbox {...props} as={TextboxComponent} ref={ref} />;
  },
);

Textbox.displayName = 'Textbox';

Textbox.defaultProps = {
  type: 'text',
};
