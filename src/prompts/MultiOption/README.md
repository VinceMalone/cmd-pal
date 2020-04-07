### Experiments

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

- `FOCUS_TOKENS_WITH_FILTER/PREVENT`
  - Arrow keys stick to native input functionality — Tokens cannot be focused.
- `FOCUS_TOKENS_WITH_FILTER/ALLOW`
  - Cursor moves through filter input value, but can be _passed_ to Tokens.
- `FOCUS_TOKENS_WITH_FILTER/ALLOW_BUT_PREVENT_REPEAT` (default) (preferred)
  - Same as "ALLOW", but won't focus Tokens if arrow key is being held.

#### Keys to remove focused Token

> ❓ Which keys should trigger a _remove_ from a focused Token?

- `REMOVE_TOKEN_KEYS/ENTER,BACKSPACE,DELETE` (default) (preferred)

#### Multi-select

- Does this sound like a valuable feature?
- How would it work? Which keys would you press?

---

- Where should focus land after removing a focused Token?

  - %% same [wrapped] index
  - %% same [wrapped] index - 1 (or + 1 with `Delete`)

- Should scrolling change the current _focus index_?

  - %% maybe after a timeout?
  - %% maybe hover changes the focus index?

---

**Notes from session with Matt T**

- Use a placeholder to indicate _filterable_
- Consider highlighting matched text in Tokens
- [Confirm Prompt] perhaps "Space" should _submit_ the prompt

---

## TODO

- [ ] [Experiment] Visible _submit button_
- [ ] [Experiment] `⌘+A` — filter, filter + tokens, filter > tokens
- [ ] [Experiment] Scroll list to keep newly selected item in same position (when token group grows in height)
- [ ] [Theme] `max-height` on token group
