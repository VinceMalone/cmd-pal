import { ComponentType } from 'react';

import { Command } from './Command';

export const CmdPal: ComponentType<{ commands: Command[] }>;

export * from './Command';
export * from './Match';
