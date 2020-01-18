import * as React from 'react';

import { CmdContainer } from './CmdContainer';

export interface CmdContainerProps {
  as?: React.ComponentType<{}>;
  children?: React.ReactNode;
  container?: Element;
}

export const CCmdContainer = ({
  as,
  children,
  container,
}: CmdContainerProps) => {
  // const handleArrowDown = React.useCallback(
  //   (evt: React.KeyboardEvent<HTMLElement>) => {
  //     evt.preventDefault();
  //     onMoveFocus(1);
  //   },
  //   [onMoveFocus],
  // );

  // const handleArrowUp = React.useCallback(
  //   (evt: React.KeyboardEvent<HTMLElement>) => {
  //     evt.preventDefault();
  //     onMoveFocus(-1);
  //   },
  //   [onMoveFocus],
  // );

  // const handleEnter = React.useCallback(() => handleExec(focusedIndex), [
  //   handleExec,
  //   focusedIndex,
  // ]);

  // const handleClose = React.useCallback(() => {
  //   setIsOpened(false);
  //   reset();
  // }, [reset]);

  // return (
  //   <CmdContainer
  //     as={as}
  //     container={container}
  //     onArrowDown={handleArrowDown}
  //     onArrowUp={handleArrowUp}
  //     onEnter={handleEnter}
  //     onOutsideClick={handleClose}
  //   >
  //     {children}
  //   </CmdContainer>
  // );

  return null;
};
