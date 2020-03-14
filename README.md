# Prompts

- text
- single-choice
- multi-choice
- confirm

## Future

- number
- password

# TODO

- "message"
- empty list UI
- API for _styling_
- focus-trap
- explore _nested prompts_ again

# Open Questions

- how far can/should I go for having compound components?
- how shitty is the `pipe` prop?
- what's the semantic and API difference between a "choice list" and a "command list"?

---

# Use Cases

1. Simple "just execute" commands

```
commands: {
  choices: [
    ...
  ]
}
```

2. New File > _enter name_

```
commands: {
  choices: [
    ...
    "New File": {
      ?
    }
  ]
}
```

3. Chose option > A1→A2 | B1→B2

   ```tsx
   <Palette>
     <SingleChoicePrompt
       choices={async () => {
         const branches = await getBranchNames();
         return [
           { label: 'Create New Branch', resolve: null },
           ...branches.map(label => ({ label, resolve: label })),
         ];
       }}
       message="Choose a branch"
       resolve={branch => {
         if (branch === null) {
           // TODO: ????
         }
         return branch;
       }}
     />
   </Palette>
   ```

   ```tsx
   <Palette>
     <SingleChoicePrompt
       choices={async () => {
         const branches = await getBranchNames();
         return [
           {
             label: 'Create New Branch',
             resolve: (
               <PromptPipe>
                 <PromptText message="Name of new branch" />
               </PromptPipe>
             ),
           },
           ...branches.map(label => ({ label, resolve: label })),
         ];
       }}
       message="Choose a branch"
       resolve={branch => {
         if (branch === null) {
           // TODO: ????
         }
         return branch;
       }}
     />
   </Palette>
   ```

   ```tsx
   <Palette>
     <SingleChoicePrompt
       choices={async () => {
         const branches = await getBranchNames();
         return [
           { label: 'Create New Branch', resolve: null },
           ...branches.map(label => ({ label, resolve: label })),
         ];
       }}
       message="Choose a branch"
       resolve={async branch => {
         if (branch === null) {
           return await (
             <PromptPipe>
               <PromptText message="Name of new branch" />
             </PromptPipe>
           );
         }
         return branch;
       }}
     />
   </Palette>
   ```

   ```tsx
   PromptPipe([
     PromptSingleChoice({
       choices: async () => {
         const branches = await getBranchNames();
         return [
           { label: 'Create new branch', resolve: null },
           ...branches.map(label => ({ label, resolve: label })),
         ];
       },
       message: 'Choose a branch',
       resolve: branch =>
         branch != null
           ? branch
           : PromptPipe([
               PromptText({
                 message: 'Name of new branch',
               }),
             ]),
     }),
   ]);
   ```

   ```tsx
   PromptPipe([
     PromptSingleChoice({
       choices: async () => {
         const branches = await getBranchNames();
         return [
           {
             label: 'Create new branch',
             resolve: PromptPipe([
               PromptText({
                 message: 'Name of new branch',
               }),
             ]),
           },
           ...branches.map(branch => ({
             label: branch.name,
             resolve: branch.name,
           })),
         ];
       },
       message: 'Choose a branch',
     }),
   ]);
   ```

   ```tsx
   const prompt = PromptPipe([
     PromptSingleChoice({
       choices: async () => {
         const branches = await getBranchNames();
         return [
           {
             label: 'Create new branch',
             resolve: PromptPipe([
               PromptText({
                 message: 'Name of new branch',
               }),
             ]),
           },
           ...branches.map(branch => ({
             label: branch.name,
             resolve: branch.name,
           })),
         ];
       },
       message: 'Choose a branch',
     }),
   ]);

   const CustomPalette = () => {
     return <Palette prompt={prompt} />;
   };
   ```

---

```
Text({
  initial,
  message,
})

SingleChoice({
  choices,
  initial,
  message,
})

MultiChoice({
  choices,
  initial,
  limit, (?)
  message,
})
```
