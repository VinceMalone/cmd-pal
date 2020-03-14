import * as React from 'react';

export const createDomId = (prefix = 'id'): string =>
  `${prefix}__${Math.random()
    .toString(36)
    .substr(2)}`;

export const useDomId = (prefix?: string): string => {
  const [domId] = React.useState(() => createDomId(prefix));
  return domId;
};
