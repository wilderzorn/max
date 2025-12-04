const webpackPlugin = (config: any): any => {
  const isProduction = process.env.NODE_ENV === 'production';

  config.mode(isProduction ? 'production' : 'development');
  config.devtool(isProduction ? 'hidden-source-map' : 'eval-source-map');

  // 配置代码分割
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

  config.module
    .rule('worker')
    .test(/\.worker\.(js|ts)$/) // 支持 js 和 ts
    .use('worker-loader')
    .loader('worker-loader')
    .options({
      inline: 'fallback',
      filename: '[name].js',
    })
    .end();

  return config;
};

export default webpackPlugin;
