import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';

type HtmlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.RefAttributes<HTMLButtonElement>;

interface ButtonComponentProps extends HtmlButtonProps {
  focused: boolean;
}

const BaseButton = styled.button<ButtonComponentProps>`
  outline: ${props => (props.focused ? 'black dotted 1px' : 'none')};
`;

export type ButtonComponent = React.ElementType<ButtonComponentProps>;

export interface ButtonProps extends HtmlButtonProps {
  as?: ButtonComponent;
  focused?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as, focused = false, ...props }, ref) => {
    const ButtonComponent = useComponent('Button', as);
    return (
      <BaseButton {...props} as={ButtonComponent} focused={focused} ref={ref} />
    );
  },
);

Button.displayName = 'Button';

Button.defaultProps = {
  type: 'button',
};
