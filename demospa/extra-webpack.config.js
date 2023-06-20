const webpack = require('webpack');

const keyPrefix = 'CX_';

let env = {};


const keys = Object.keys(process.env).filter((key) =>
  key.startsWith(keyPrefix)
);

keys.forEach((key) => (env[key] = JSON.parse(process.env[key])));

console.log('Prebuild env:', env);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'build.process.env': env,
    }),
  ],
};
