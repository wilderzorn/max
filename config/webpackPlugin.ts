import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const webpackPlugin = (config: any): any => {
  const isProduction = process.env.NODE_ENV === 'production';

  config.mode(isProduction ? 'production' : 'development');
  config.devtool(isProduction ? 'hidden-source-map' : 'eval-source-map');

  config.optimization.splitChunks({
    chunks: 'all',
    minSize: 10000,
    minChunks: 2,
    maxAsyncRequests: 10,
    maxInitialRequests: 5,
    automaticNameDelimiter: '.',
    cacheGroups: {
      vendor: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
      },
      antdesigns: {
        name: 'antdesigns',
        test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
        priority: 40,
        enforce: true,
      },
      images: {
        name: 'images',
        test: /\.(png|jpe?g|gif|svg)$/i,
        priority: 50,
      },
      pages: {
        name: 'pages',
        test: /[\\/]src[\\/]/,
        priority: 60,
      },
    },
  });

  // 开发环境下启用 webpack-bundle-analyzer
  if (!isProduction && process.env.ANALYZE) {
    config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin, [
      {
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
      },
    ]);
  }

  return config;
};

export default webpackPlugin;
