import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { useOnOutsideClick } from '../utils/useOnOutsideClick';

const Container = styled.div`
  box-sizing: border-box;
  left: 0;
  margin: auto;
  max-width: ${props => props.theme.maxWidth};
  outline: none;
  position: fixed;
  right: 0;
  top: ${props => props.theme.offsetTop};
  width: calc(100% - ${props => props.theme.offsetSides});
  z-index: ${props => props.theme.zIndex};
`;

// TODO: dis good?
Container.defaultProps = {
  theme: {
    maxWidth: '600px',
    offsetSides: '2rem',
    offsetTop: '2rem',
    zIndex: 1,
  },
};

const Surround = styled.div`
  /* display: flex; */
  /* flex-direction: column; */

  /* TODO: can't use because of list virtualization */
  /* max-height: calc(100vh - ${props => props.theme.maxHeight}); */

  background-color: white;
  border: solid;
  color: black;
  font-family: sans-serif;
  line-height: 1.25;
  padding: 0.5em 1em;
`;

// const Dialog = React.forwardRef<
//   HTMLDialogElement,
//   React.DialogHTMLAttributes<HTMLDialogElement>
// >((props, ref) => <dialog {...props} open ref={ref} />);
// Dialog.displayName = 'Dialog';

const noop = () => undefined;

type ElementProps = React.HTMLAttributes<HTMLDivElement>;

export interface CmdContainerProps extends ElementProps {
  as?: React.ElementType<{ children?: React.ReactNode }>;
  children?: React.ReactNode;
  container?: Element;
  onOutsideClick?(evt: UIEvent): void;
}

export const CmdContainer = React.forwardRef<
  HTMLElement | null,
  CmdContainerProps
>(
  (
    {
      as,
      children,
      container = document.body,
      onOutsideClick = noop,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => containerRef.current);
    useOnOutsideClick([containerRef], onOutsideClick);

    return (
      <Container {...props} ref={containerRef} tabIndex={-1}>
        <Surround as={as}>{children}</Surround>
      </Container>
    );

    // // TODO: temp remove debug
    // container = document.getElementById('cmd-pal-root') ?? container;

    // return createPortal(
    //   // TODO: add `role`
    //   <Container {...props} ref={containerRef} tabIndex={-1}>
    //     <Surround as={as}>{children}</Surround>
    //   </Container>,
    //   container,
    // );
  },
);

CmdContainer.displayName = 'CmdContainer';
