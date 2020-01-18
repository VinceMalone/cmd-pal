// Wrap in tuple - https://github.com/Microsoft/TypeScript/issues/29368#issuecomment-453529532
export type Action<T extends string, P = undefined> = [P] extends [undefined]
  ? { type: T }
  : { type: T; payload: P };
