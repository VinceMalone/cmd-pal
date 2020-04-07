import { Functionable } from './Functionable';

/**
 * A type (T) that _may_ be in one of four different states:
 * 1. itself — `T`
 * 2. a promise — `Promise<T>`
 * 3. a function — `() => T`
 * 4. a function that returns a promise — `() => Promise<T>`
 *
 * ℹ️ Arguments for the function wrapper can be specified using the second generic argument — `A`.
 *
 * ```
 * T | Promise<T> | A → T | A → Promise<T>
 * ```
 *
 * For example:
 * `Resolvable<string>` is the same as
 * `string | Promise<string> | (() => string) | (() => Promise<string>)`
 */
export type Resolvable<T, A extends unknown[] = []> = Functionable<
  T | Promise<T>,
  A
>;
