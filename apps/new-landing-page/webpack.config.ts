import path from 'path';
import { fileURLToPath } from 'url';
import type { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { tanstackRouter } from '@tanstack/router-plugin/webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default (env: { WEBPACK_SERVE?: boolean }): Configuration => {
    const isDev = !!env.WEBPACK_SERVE;

    return {
        target: 'web',
        mode: isDev ? 'development' : 'production',

        entry: path.resolve(__dirname, './src/index.tsx'),

        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[contenthash].js',
            publicPath: '/',
            clean: true,
        },

        devtool: isDev ? 'eval-source-map' : 'source-map',

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                filename: 'index.html',
            }),

            tanstackRouter({
                target: 'react',
                autoCodeSplitting: true,
            }),

            // Only extract CSS in production
            !isDev &&
                new MiniCssExtractPlugin({
                    filename: '[name].[contenthash].css',
                }),
        ].filter(Boolean) as Configuration['plugins'],

        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },

                {
                    test: /\.css$/,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                    ],
                },
            ],
        },

        devServer: {
            open: true,
            hot: true,
            historyApiFallback: {
                rewrites: [{ from: /./, to: '/index.html' }],
            },
            static: {
                directory: path.resolve(__dirname, 'public'),
            },
        },
    };
};
