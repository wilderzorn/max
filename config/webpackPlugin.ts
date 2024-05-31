const { NODE_ENV } = process.env;
const { ModuleFederationPlugin } = require('webpack').container;
import { resolve } from 'path';

export const webpackPlugin = (config) => {
  if (NODE_ENV === 'production') {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          minChunks: 2,
          maxAsyncRequests: 10,
          maxInitialRequests: 5,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
            antdesigns: {
              name: 'antdesigns',
              test({ resource }) {
                return /[\\/]node_modules[\\/](@ant-design|antd|@antd)[\\/]/.test(resource);
              },
              priority: 40,
              enforce: true,
            },
            image: {
              name: 'images',
              test({ resource }) {
                return /png/.test(resource);
              },
              priority: 50,
            },
            pages: {
              name: 'pages',
              test({ resource }) {
                return /[\\/]src[\\/]/.test(resource);
              },
              priority: 60,
            },
          },
        },
      },
    });
  }
  config
    .plugin('replace')
    .use(require('webpack').ContextReplacementPlugin)
    .tap(() => {
      return [/moment[/\\]locale$/, /zh-cn/];
    });
};

export default webpackPlugin;
