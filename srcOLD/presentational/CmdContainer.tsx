import * as React from 'react';
import { useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { useComponents } from '../util/components';
import { useOnOutsideClick } from '../util/useOnOutsideClick';

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
  max-height: calc(100vh - ${props => props.theme.maxHeight});
`;

export interface CmdContainerProps {
  children?: React.ReactNode;
  onArrowDown?(evt: React.KeyboardEvent<HTMLElement>): void;
  onArrowUp?(evt: React.KeyboardEvent<HTMLElement>): void;
  onEnter(evt: React.KeyboardEvent<HTMLElement>): void;
  onOutsideClick(evt: UIEvent): void;
}

export const CmdContainer = ({
  children,
  onArrowDown,
  onArrowUp,
  onEnter,
  onOutsideClick,
}: CmdContainerProps) => {
  const parent = document.body;
  const containerRef = useRef<HTMLDivElement>(null);
  const components = useComponents();

  const handleKeyDown = useCallback(
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

  useOnOutsideClick(containerRef, onOutsideClick);

  return createPortal(
    <Container onKeyDown={handleKeyDown} ref={containerRef}>
      <Surround as={components.Surround}>{children}</Surround>
    </Container>,
    parent,
  );
};
