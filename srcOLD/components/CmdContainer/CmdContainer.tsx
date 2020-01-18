import * as React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { useOnOutsideClick } from '../../util/useOnOutsideClick';

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
  /* max-height: calc(100vh - ${props => props.theme.maxHeight}); */
`;

export interface CmdContainerProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
  container?: Element;
  onArrowDown?(evt: React.KeyboardEvent<HTMLElement>): void;
  onArrowUp?(evt: React.KeyboardEvent<HTMLElement>): void;
  onEnter(evt: React.KeyboardEvent<HTMLElement>): void;
  onOutsideClick(evt: UIEvent): void;
}

export const CmdContainer = ({
  as,
  children,
  container = document.body,
  onArrowDown,
  onArrowUp,
  onEnter,
  onOutsideClick,
}: CmdContainerProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  useOnOutsideClick(containerRef, onOutsideClick);

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      switch (evt.key) {
        case 'ArrowDown':
          if (onArrowDown) {
            onArrowDown(evt);
          }
          break;
        case 'ArrowUp':
          if (onArrowUp) {
            onArrowUp(evt);
          }
          break;
        case 'Enter':
          onEnter(evt);
          break;
      }
    },
    [onArrowDown, onArrowUp, onEnter],
  );

  return createPortal(
    // TODO: add `role`
    <Container onKeyDown={handleKeyDown} ref={containerRef} tabIndex={0}>
      <Surround as={as}>{children}</Surround>
    </Container>,
    container,
  );
};
