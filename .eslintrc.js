module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'react-hooks', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist/'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': [0],
    'import/newline-after-import': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: { caseInsensitive: false, order: 'asc' },
        groups: ['external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
      },
    ],
    'react/prop-types': [0],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
