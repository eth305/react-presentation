const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
    devServer: {
        port: 8082,
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    },
    mode: "development",
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
            publicPath: "/"
        }),
        new ModuleFederationPlugin({
            name: "provider2",
            filename: "remoteEntry.js",
            remotes: {},
            exposes: {
                "./Provider2": "./src/Provider2"
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps["react"],
                    eager: true
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                    eager: true
                },
            }
        })
    ],
}