module.exports = {
  addons: ['@storybook/preset-typescript', '@storybook/addon-docs'],
  stories: ['../src/**/*.stories.(tsx|mdx)'],
  webpackFinal: config => {
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        // 'react-docgen-typescript-loader',
      ],
    });
    return config;
  },
};
