import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { useOnOutsideClick } from '../utils/useOnOutsideClick';

const Container = styled.div`
  left: 50%;
  max-width: ${props => props.theme.maxWidth};
  position: fixed;
  top: ${props => props.theme.offsetTop};
  transform: translateX(-50%);
  width: calc(100% - ${props => props.theme.offsetSides});
  z-index: ${props => props.theme.zIndex};
`;

const Surround = styled.div`
  display: flex;
  flex-direction: column;
  /* TODO: can't use because of list virtualization */
  /* max-height: calc(100vh - ${props => props.theme.maxHeight}); */
`;

type ElementProps = React.HTMLAttributes<HTMLDivElement>;

export interface CmdContainerProps extends ElementProps {
  as?: React.ElementType<{ children?: React.ReactNode }>;
  children?: React.ReactNode;
  container?: Element;
  onOutsideClick(evt: UIEvent): void;
}

export const CmdContainer = ({
  as,
  children,
  container = document.body,
  onOutsideClick,
  ...props
}: CmdContainerProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  useOnOutsideClick([containerRef], onOutsideClick);

  return createPortal(
    // TODO: add `role`
    <Container {...props} ref={containerRef} tabIndex={0}>
      <Surround as={as}>{children}</Surround>
    </Container>,
    container,
  );
};
