import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { CmdPromptSingleChoice } from './prompts/CmdPromptSingleChoice';
import { CmdPromptText } from './prompts/CmdPromptText';
import { Prompt } from './types';

interface SubPipe {
  name: string;
  pipe: Prompt[];
}

interface Result {
  [name: string]: unknown;
}

export interface CmdPipingProps {
  name: string;
  onCommit(result: { name: string; value: Result }): void;
  onExit(): void;
  pipe: Prompt[];
}

export const CmdPiping = ({ name, onCommit, onExit, pipe }: CmdPipingProps) => {
  const [subPipe, setSubPipe] = useState<SubPipe | null>(null);

  const result = useRef<Result>({});
  const [index, setIndex] = useState(() => {
    if (pipe.length === 0) {
      throw new Error('pipe has no steps');
    }

    return 0;
  });

  const prompt = pipe[index];

  const commit = useCallback(() => {
    onCommit({
      name,
      value: result.current,
    });
  }, [name, onCommit]);

  const handleCommit = useCallback(
    async value => {
      if (Array.isArray(prompt.exec)) {
        setSubPipe({ name: prompt.name, pipe: prompt.exec });
        if (index + 1 !== pipe.length) {
          setIndex(current => current + 1);
        }
      } else {
        // TODO: set progress
        result.current[prompt.name] = await prompt.exec(value);

        if (index + 1 === pipe.length) {
          commit();
        } else {
          setIndex(current => current + 1);
        }
      }
    },
    [commit, index, pipe.length, prompt],
  );

  const handleCommitSubPipe = useCallback(
    ({ name, value }) => {
      result.current[name] = value;
      setSubPipe(null);

      if (index + 1 === pipe.length) {
        commit();
      }
    },
    [commit, index, pipe.length],
  );

  const choices = useMemo(
    () =>
      prompt.type === 'single-choice'
        ? Array.isArray(prompt.choices)
          ? prompt.choices
          : prompt.choices(result.current)
        : [],
    [prompt],
  );

  if (subPipe !== null) {
    return (
      <CmdPiping
        name={subPipe.name}
        onCommit={handleCommitSubPipe}
        onExit={onExit}
        pipe={subPipe.pipe}
      />
    );
  }

  switch (prompt.type) {
    case 'single-choice':
      return (
        <CmdPromptSingleChoice
          choices={choices}
          message={prompt.message}
          onCommit={handleCommit}
          onExit={onExit}
        />
      );
    case 'text':
      return (
        <CmdPromptText
          message={prompt.message}
          onCommit={handleCommit}
          onExit={onExit}
        />
      );
  }
};
