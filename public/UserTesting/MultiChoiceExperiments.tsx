import * as React from 'react';

import { MultiChoice } from '../../src/prompts/MultiChoice';

import { MyPalette } from './MyPalette';
import { Test } from './Test';
import { netflixChoices } from './fixtures';

export const MultiChoiceExperiments = () => {
  const [titles, setTitles] = React.useState<string[]>([]);

  return (
    <Test title="Multi-Choice Experiments">
      <MyPalette
        openOn="option+shift+p"
        prompt={[
          <MultiChoice
            key="1"
            message="Choose your favorite Netflix titles"
            choices={netflixChoices}
            resolve={setTitles}
          />,
        ]}
      />
      {titles.length > 0 && (
        <>
          <p>You selected:</p>
          <ul>
            {titles.map(title => (
              <li key={title}>{title}</li>
            ))}
          </ul>
          <button onClick={() => setTitles([])} type="button">
            clear
          </button>
        </>
      )}
    </Test>
  );
};
