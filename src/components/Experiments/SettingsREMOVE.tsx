import * as React from 'react';

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

const mergeDeep = <A extends Record<string, unknown>, B extends Partial<A>>(
  a: A,
  b: B,
) => {
  const result: Record<string, unknown> = { ...a };
  for (const [key, value] of Object.entries(b)) {
    if (value !== null && typeof value === 'object') {
      result[key] = mergeDeep(result[key] as A, value);
    } else {
      result[key] = value;
    }
  }
  return result as A;
};

const createSettings = <T extends Record<string, unknown>>(defaults: T) => {
  const SettingsContext = React.createContext<T>(defaults);

  const useSettingsContext = () => React.useContext(SettingsContext);

  interface SettingsProps {
    children?: React.ReactNode;
    initial?: RecursivePartial<T>;
  }

  const Settings: React.FC<SettingsProps> = ({ children, initial }) => {
    const initialRef = React.useRef(initial);
    const containingContext = useSettingsContext();

    const context = React.useMemo(
      () => mergeDeep(containingContext, initialRef.current ?? {}),
      [containingContext],
    );

    return (
      <SettingsContext.Provider value={context}>
        {children}
      </SettingsContext.Provider>
    );
  };

  return {
    Settings,
    SettingsContext,
    useSettingsContext,
  };
};

//

enum FocusTokensWithFilter {
  Prevent = 'PREVENT',
  Allow = 'ALLOW',
  AllowButPreventRepeat = 'ALLOW_BUT_PREVENT_REPEAT',
}

enum TokenOrder {
  TimeOfSelection = 'TIME_OF_SELECTION',
  SameAsList = 'SAME_AS_LIST',
}

const { Settings } = createSettings({
  FOCUS_TOKENS_WITH_FILTER: {
    options: Object.values(FocusTokensWithFilter),
    value: FocusTokensWithFilter.AllowButPreventRepeat,
  },
  TOKEN_ORDER: {
    options: Object.values(TokenOrder),
    value: TokenOrder.TimeOfSelection,
  },
});

export const element = (
  <Settings
    initial={{
      FOCUS_TOKENS_WITH_FILTER: {
        value: FocusTokensWithFilter.AllowButPreventRepeat,
      },
    }}
  >
    <section>
      <Settings
        initial={{
          TOKEN_ORDER: {
            value: TokenOrder.TimeOfSelection,
          },
        }}
      >
        <section>
          <Settings>
            <section />
          </Settings>
        </section>
      </Settings>
    </section>
  </Settings>
);
