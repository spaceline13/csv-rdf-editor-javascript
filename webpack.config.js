const path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: ["@babel/polyfill", __dirname + '/src/forBuild.js'],
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'editor.js',
        library: 'editor',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                //Inlcude only 3rd party css that needs to be scoped globally to use
                //css-loader with modules disabled
                include: [
                    path.resolve('node_modules/ag-grid-community/dist/styles/ag-grid.css'),
                    path.resolve('node_modules/ag-grid-community/dist/styles/ag-theme-balham.css'),
                    path.resolve('src/styles/AgGridValidator.css'),
                    path.resolve('src/styles/ReactTabs.css'),
                ],
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            }
        ]
    }
};