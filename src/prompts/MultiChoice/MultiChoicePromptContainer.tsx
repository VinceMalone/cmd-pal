import * as React from 'react';

import { Dialog, DialogProps } from '../../components/base/Dialog';
import { usePromptContext } from '../../contexts/prompt';
import { unfocus, useTokensContext } from '../../contexts/tokens';

interface ContainerBaseProps extends Omit<DialogProps, 'onOutsideClick'> {}

const ContainerBase = React.forwardRef<HTMLElement | null, ContainerBaseProps>(
  (props, ref) => {
    return <Dialog {...props} ref={ref} />;
  },
);

ContainerBase.displayName = 'ContainerBase';

//

interface MultiChoicePromptContainerCommonProps {
  as?: ContainerBaseProps['as'];
  children?: React.ReactNode;
}

//

interface ContainerUnresolvedProps
  extends MultiChoicePromptContainerCommonProps {}

const ContainerUnresolved: React.FC<ContainerUnresolvedProps> = props => {
  const { onExit } = usePromptContext();

  const handleKeyDown = React.useCallback(
    (evt: React.KeyboardEvent<HTMLElement>) => {
      if (evt.key === 'Tab' && !evt.isDefaultPrevented()) {
        evt.preventDefault();
      } else if (evt.key === 'Escape') {
        onExit();
      }
    },
    [onExit],
  );

  return <ContainerBase {...props} onKeyDown={handleKeyDown} />;
};

//

interface ContainerReadyProps extends MultiChoicePromptContainerCommonProps {}

const ContainerReady: React.FC<ContainerReadyProps> = props => {
  const { dispatch } = useTokensContext();

  const containerRef = React.useRef<HTMLElement>(null);

  const handleClick = React.useCallback(() => {
    // TODO
    containerRef.current?.querySelector('input')?.focus();
    dispatch(unfocus());
  }, [dispatch]);

  return <ContainerBase {...props} onClick={handleClick} ref={containerRef} />;
};

//

export interface MultiChoicePromptContainerProps
  extends MultiChoicePromptContainerCommonProps {
  ready?: boolean;
}

export const MultiChoicePromptContainer: React.FC<MultiChoicePromptContainerProps> = ({
  ready = false,
  ...props
}) => {
  const Container = ready ? ContainerReady : ContainerUnresolved;
  return <Container {...props} />;
};
