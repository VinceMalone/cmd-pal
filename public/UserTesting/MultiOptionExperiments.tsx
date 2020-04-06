import * as React from 'react';

import { MultiOption } from '../../src/prompts/MultiOption';

import { MyPalette } from './MyPalette';
import { Test } from './Test';
import { netflixOptions } from './fixtures';

export const MultiOptionExperiments = () => {
  const [titles, setTitles] = React.useState<string[]>([]);

  return (
    <Test title="Multi-Option Experiments">
      <MyPalette
        openOn="option+shift+p"
        prompt={[
          <MultiOption
            key="1"
            message="Choose your favorite Netflix titles"
            options={netflixOptions}
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
