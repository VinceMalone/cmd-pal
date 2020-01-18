import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import { ListProvider, setItems, useListContext } from '../list';
import { Highlighted } from '../presentational2/Highlighted';
import { MenuList } from '../presentational2/MenuList';
import { MenuOption } from '../presentational2/MenuOption';
import { Progress } from '../presentational2/Progress';
import { Prompt } from '../presentational2/Prompt';
import { Search } from '../presentational2/Search';
import { PromptProvider } from '../prompt';
import { ComponentsProvider, useComponents } from '../util/components';

const Palette: React.FC<{ commands: any }> = ({ commands }) => {
  const as = useComponents();
  const { dispatch } = useListContext();
  const commandsRef = React.useRef(commands);

  React.useEffect(() => {
    dispatch(setItems(commandsRef.current));
  }, [dispatch]);

  return (
    <Prompt as={as.Surround}>
      <Progress as={as.Progress} />
      <Search as={as.Input} />
      <MenuList as={as.List} itemHeight={32}>
        {({ focused, item, onSelect }) => (
          <MenuOption
            as={as.Option}
            focused={focused}
            id={item.id}
            label={item.label}
            onSelect={onSelect}
          >
            <Highlighted
              as={as.Mark}
              label={item.label}
              matches={item.matches}
            />
          </MenuOption>
        )}
      </MenuList>
    </Prompt>
  );
};

export const CmdPal: React.FC<{
  commands: any;
  components: any;
  theme: any;
}> = ({ commands, components, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <ComponentsProvider components={components}>
        <ListProvider>
          <PromptProvider>
            <Palette commands={commands} />
          </PromptProvider>
        </ListProvider>
      </ComponentsProvider>
    </ThemeProvider>
  );
};
