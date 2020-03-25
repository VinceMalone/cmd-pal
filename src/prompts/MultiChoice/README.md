## User Test

> 💬 Don't worry about a11y

> 💬 Feel free to comment on style/visual, but understand that most elements are customizable (themeable)

### Steps

1. Open the prompt
   - What do you see?
   - How well do they understand what they're looking at?
2. Explore the list
   - Did the user search before scrolling?
   - **Searching**
     - How quickly did the user find the movie they were looking for?
     - How do they feel about the searching algorithm?
       - How would they prefer it work?
3. Choose three movies
   - Did the user use the keyboard to select a movie?
     - Which key did they use?
4. Remove two of the selected movies
   - How did the user remove a token?
5. Select a couple more movies
   - What would a bulk select look like?
     - What key-combination would you use?
6. Clear all of them
7. Select more and submit

### Experiments

#### List filter/matching algorithm

> ❓ How should the list filter/matching algorithm work?

- `LIST_FILTER_ALGORITHM/SPREAD_TO_EXACT` (default)
- `LIST_FILTER_ALGORITHM/EXACT_TO_WORD` (preferred)

#### Circular keyboard navigation for "selected tokens"

> ❓ Should the keyboard navigation for the "selected tokens" list be _circular_?

What should happen when an _edge_ token is focused and navigation (Arrow Left/Right or Up/Down) occurs?

- `TOKEN_KEYBOARD_NAVIGATION/CIRCULAR` (default) (preferred)
  - Focus moves to the _opposite ended_ token.
- `TOKEN_KEYBOARD_NAVIGATION/CLOSED`
  - Nothing; focus stays where it is.

#### Keyboard repeat check for Backspace and Delete

> ❓ Is the _keyboard repeat_ check a good UX for `Backspace` and `Delete`?

- `tokens/KEYBOARD_REPEAT/PREVENT` (default) (preferred)
- `tokens/KEYBOARD_REPEAT/TIMEOUT`
- `tokens/KEYBOARD_REPEAT/ALLOW`

What does _clear all_ look like? How valuable would this be?

- Valuable; see "escape to close" experiment

#### List UI when focusing Token

> ❓ What should happen with the list when focusing a 'selected token'?

- `TOKEN_FOCUS_LIST_ITEM_UI/NONE` (default) (preferred)
  - Leave the list (and filter) as is.
- `TOKEN_FOCUS_LIST_ITEM_UI/REFLECT`
  - Clear the filter and focus the selected item (that matches the selected token.)

#### Focusing Tokens with active filter value

> ❓ Can focus be moved to tokens when the filter has a value?

- `FOCUS_TOKENS_WITH_FILTER/PREVENT` (default)
  - Arrow keys stick to native input functionality — Tokens cannot be focused.
- `FOCUS_TOKENS_WITH_FILTER/ALLOW`
  - Cursor moves through filter input value, but can be _passed_ to Tokens.
- `FOCUS_TOKENS_WITH_FILTER/ALLOW_BUT_PREVENT_REPEAT` (preferred)
  - Same as "ALLOW", but won't focus Tokens if arrow key is being held.

#### Keys to remove focused Token

> ❓ Which keys should trigger a _remove_ from a focused Token?

- `REMOVE_TOKEN_KEYS/ENTER,BACKSPACE,DELETE` (default) (preferred)

#### Token selection order

> ❓ In what order should the tokens appear in?

- `TOKEN_ORDER/TIME_OF_SELECTION` (default) (preferred)
- `TOKEN_ORDER/SAME_AS_LIST`

#### Escape to close

> ❓ Is `esc` to close [the prompt] too aggressive? Should it _clear values_ first?

- `ESCAPE_TO_CLOSE/IMMEDIATE` (default)
- `ESCAPE_TO_CLOSE/CLEAR_FIRST` (preferred)

#### Multi-select

- Does this sound like a valuable feature?
- How would it work? Which keys would you press?

---

TODO - more experiments

- Should `Arrow(Down|Up)` re-focus the list? (same as `input` event)

- Which Token should be focused after pressing `Backspace` and `Delete`?

- Should _selected_ list items still appear in the list?

  - Do _selected_ list items appear in the list even if they don't match the _filter_?

- Does selecting (or deselecting) a list item reset the filter value?

- Should `Tab` navigate the Token focus?

  - %% Doesn't hurt; try it

- Where should focus land after removing a focused Token?

  - %% same [wrapped] index
  - %% same [wrapped] index - 1 (or + 1 with `Delete`)

- Should scrolling change the current _focus index_?

  - %% maybe after a timeout?
  - %% maybe hover changes the focus index?

---

**Notes from session with Matt T**

- Use a placeholder to indicate _filterable_
- ❗️ Allow _jumping_ in the list
  - Paging — `PageUp` and `PageDown`
  - Go to Top/Bottom — `⌘+↑` or `⌃+↑`
- Consider highlighting matched text in Tokens
- [Confirm Prompt] perhaps "Space" should _submit_ the prompt

---

- Try out this API for an action that takes an _index_ or _delta_ — rather than different functions, use the following argument: `{ index: number } | { delta: number }`.
