const path = require('path');
const merge = require('webpack-merge');

const defaultConfig = require('./webpack.config');

module.exports = merge(defaultConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
});
