import { createReducerContext, useEffectOnce } from 'react-use';

const [useRegistry, FocusProvider] = createReducerContext(
  (
    registry: Set<string>,
    { name, type }: { name: string; type: 'add' | 'remove' },
  ): Set<string> => {
    switch (type) {
      case 'add':
        return new Set(registry.add(name));
      case 'remove': {
        const set = new Set(registry);
        set.delete(name);
        return set;
      }
      default:
        throw new Error(`${type} is not a registry action`);
    }
  },
  new Set<string>(),
);

export { FocusProvider };

export const useFocusContext = (name: string): boolean => {
  const [registry, dispatch] = useRegistry();

  useEffectOnce(() => {
    dispatch({ name, type: 'add' });
    return () => {
      dispatch({ name, type: 'remove' });
    };
  });

  // return registry.has(name);
  return false;
};
