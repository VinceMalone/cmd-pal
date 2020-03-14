import { Item, ListItem } from './List';
import { Resolvable } from './Resolvable';

export interface Choice<V, In> extends Item {
  resolve: Resolvable<V, [In]>;
}

export interface ChoiceListItem<V = unknown, In = unknown>
  extends Choice<V, In>,
    ListItem {}
