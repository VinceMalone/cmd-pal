import * as React from 'react';
import styled from 'styled-components';

import { useComponent } from '../../contexts/components';
import { usePromptContext } from '../../contexts/prompt';
import { useOnOutsideClick } from '../../utils/useOnOutsideClick';

const BaseDialog = styled.div`
  background-color: white;
  border: solid;
  box-sizing: border-box;
  color: black;
  font-family: sans-serif;
  left: 0;
  line-height: 1.25;
  margin: auto;
  max-width: ${props => props.theme.maxWidth};
  outline: none;
  padding: 0.5em 1em;
  position: fixed;
  right: 0;
  top: ${props => props.theme.offsetTop};
  width: calc(100% - ${props => props.theme.offsetSides});
  z-index: ${props => props.theme.zIndex};
`;

BaseDialog.defaultProps = {
  theme: {
    maxWidth: '600px',
    offsetSides: '2rem',
    offsetTop: '2rem',
    zIndex: 1,
  },
};

type HtmlProps = React.HTMLAttributes<HTMLElement> &
  React.RefAttributes<HTMLElement>;

interface DialogComponentProps extends HtmlProps {}

export type DialogComponent = React.ElementType<DialogComponentProps>;

export interface DialogProps extends HtmlProps {
  as?: DialogComponent;
}

export const Dialog = React.forwardRef<HTMLElement | null, DialogProps>(
  ({ as, ...props }, ref) => {
    const DialogComponent = useComponent('Dialog', as);

    const dialogRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => dialogRef.current);

    const { onExit } = usePromptContext();
    useOnOutsideClick([dialogRef], onExit);

    return (
      <BaseDialog
        {...props}
        as={DialogComponent}
        ref={dialogRef}
        tabIndex={-1}
      />
    );
  },
);

Dialog.displayName = 'Dialog';
