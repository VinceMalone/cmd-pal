import faker from 'faker/locale/en';

import { Prompts } from './prompts';

faker.seed(1);

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const choices = Array.from({ length: 2000 }, () => ({
  label: faker.company.catchPhrase(),
  resolve: faker.random.uuid(),
}));

export const commands = [
  Prompts.SingleChoice({
    choices: choices.map(({ label, resolve }) => ({
      label,
      resolve: async () => {
        await wait(800);
        console.log('SIDE_EFFECT... executing:', resolve);
      },
    })),
  }),
];

export const workflow = [
  Prompts.SingleChoice({
    choices,
    message: 'Select... one',
  }),
  Prompts.Text({
    // initialValue: "const reallyReally = !!'!!!';",
    message: 'Testing 1, 2, 3',
    placeholder: x => x,
    resolve: console.log,
  }),
];

//

export { confirm } from './confirm';
export { list } from './list';

// export const confirm = [
//   Prompts.Confirm({
//     message: 'Are you sure?',
//     resolve: console.log,
//   }),
//   Prompts.Confirm({
//     initialValue: false,
//     resolve: console.log,
//   }),
//   Prompts.Confirm({
//     resolve: console.log,
//   }),
// ];

//

export const multi = [
  Prompts.MultiChoice({
    choices,
    message: 'Select one or more',
    resolve: console.log,
  }),
];

//

export const state = [
  Prompts.Text({
    message: async () => {
      await wait(1000);
      throw new Error('WTF');
      return 'Message here';
    },
  }),
];

//

function PromptPipe<T>(pipe: JSX.Element[]): Promise<T> {
  const p = [...pipe];
  // @ts-ignore
  p.__promptPipe = true;
  return p as any;
}

const getBranchNames = async () => {
  await wait(800);
  return Array.from({ length: 30 }, () => ({
    name: faker.system.fileName(),
    // name: 5,
  }));
};

export const todo = [
  Prompts.SingleChoice({
    message: 'Choose a branch',
    resolve: branchName => console.log('Selected Branch:', branchName),
    choices: async () => {
      const branches = await getBranchNames();
      console.log('branches', branches);
      return [
        {
          label: 'Create new branch',
          resolve: PromptPipe<string>([
            Prompts.Text({
              message: 'Name of new branch',
              resolve: async branchName => {
                await wait(800);
                console.log('Creating new branch...', branchName);
                return branchName;
              },
            }),
          ]),
        },
        ...branches.map(branch => ({
          label: branch.name,
          resolve: branch.name,
        })),
      ];
    },
  }),
];
