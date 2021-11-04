const getWebpackConfig = require('@nrwl/react/plugins/webpack');
const path = require('path')

function getCustomWebpackConfig(webpackConfig) {
    const config = getWebpackConfig(webpackConfig);
    const isProduction = webpackConfig.mode === 'production';

    if (!isProduction) {
        config.resolve.alias = { ...config.resolve.alias, 'react-native$': 'react-native-web' };
        config.resolve.extensions = ['.web.js', ...config.resolve.extensions];


        config.module.rules.push(
            {
                test: /\.ttf$/,
                loader: require.resolve('file-loader'),
                options: { esModule: false, name: 'static/media/[path][name].[ext]' },
            },
            {
                test: /\.(js|jsx|tsx)$/,
                exclude: function (content) {
                    return (
                      (/node_modules/.test(content) &&
                        !/\/react-native-elements\//.test(content) &&
                        !/\/react-native-reanimated\//.test(content) &&
                        !/\/react-native-vector-icons\//.test(content) &&
                        !/\/react-native-ratings\//.test(content)) ||
                      /\/deepmerge\//.test(content)
                    );
                  },
                use: {
                    loader: require.resolve('@nrwl/web/src/utils/web-babel-loader.js'),
                    options: {
                        presets: [
                            [
                                '@nrwl/react/babel',
                                {
                                    runtime: 'automatic',
                                    useBuiltIns: 'usage',
                                },
                            ],
                        ],
                        plugins: ['react-native-web', 'react-native-reanimated/plugin'],
                    },
                },
            }
        );
    }

    return {
        ...config,
        node: { global: true }, // Fix: "Uncaught ReferenceError: global is not defined", and "Can't resolve 'fs'".
    };
}

module.exports = getCustomWebpackConfig;