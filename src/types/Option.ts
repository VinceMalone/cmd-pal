import { Item, ListItem } from './List';
import { Resolvable } from './Resolvable';

export interface OptionBag<V, In> extends Item {
  resolve: Resolvable<V, [In]>;
}

export interface OptionListItem<V = unknown, In = unknown>
  extends OptionBag<V, In>,
    ListItem {}
