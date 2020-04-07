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
  max-width: 600px;
  outline: none;
  padding: 0.5em 1em;
  position: fixed;
  right: 0;
  top: 2em;
  width: calc(100% - 2em);
  z-index: 1;
`;

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
