export interface Part {
  id: string;
  isMatch: boolean;
  value: string;
}

//

export interface Item {
  id: string;
  label: string;
}

export interface Searchable {
  matches: [number, number][];
}

export interface ListItem extends Item, Searchable {}

export interface Option extends Item {
  value: string;
}

export interface OptionItem extends Option, Searchable {}

export interface Command<In = unknown, Out = unknown>
  extends Item,
    Executable<In, Out> {}

export interface CommandItem<In = unknown, Out = unknown>
  extends Command<In, Out>,
    Searchable {}

//

export interface PromptSingleChoice<In = unknown, Out = unknown>
  extends Executable<In, Out> {
  choices: Option[] | ((value: { [name: string]: unknown }) => Option[]);
  message?: string;
  name: string;
  type: 'single-choice';
}

export interface PromptText<In = unknown, Out = unknown>
  extends Executable<In, Out> {
  message?: string;
  name: string;
  type: 'text';
}

export type Prompt = PromptSingleChoice | PromptText;

//

interface Executable<In = unknown, Out = unknown> {
  // TODO: optional?
  exec: ((value?: In) => Promise<Out>) | Prompt[];
}
