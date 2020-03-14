import * as React from 'react';
// import { render } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Neat trick, but ended up not working great because _context_ didn't follow the element being rendered/measured.
 *
 * TODO: remove from here and turn into a gist
 */

const visuallyHide = (element: HTMLElement) => {
  element.style.clip = 'rect(0 0 0 0)';
  element.style.clipPath = 'inset(50%)';
  element.style.height = '1px';
  element.style.overflow = 'hidden';
  element.style.position = 'absolute';
  element.style.whiteSpace = 'nowrap';
  element.style.width = '1px';
};

export const useReactElementHeight = (element: React.ReactElement): number => {
  const [height, setHeight] = React.useState(0);

  const markup = renderToStaticMarkup(element);

  console.log(height, markup);

  React.useLayoutEffect(() => {
    const root = document.createElement('div');
    root.innerHTML = markup;
    visuallyHide(root);
    document.body.appendChild(root);

    // render(element, root, () => {
    //   if (root.firstElementChild != null) {
    //     setHeight(root.firstElementChild.getBoundingClientRect().height);
    //   }
    //   document.body.removeChild(root);
    // });

    if (root.firstElementChild != null) {
      setHeight(root.firstElementChild.getBoundingClientRect().height);
    }
    document.body.removeChild(root);
  }, [markup]);

  return height;
};
