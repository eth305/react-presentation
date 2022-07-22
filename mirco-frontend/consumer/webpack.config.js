const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
    devServer: {
        port: 8080,
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
            name: "consumer",
            filename: "remoteEntry.js",
            remotes: {
                provider1: "provider1@http://localhost:8081/remoteEntry.js",
                provider2: "provider2@http://localhost:8082/remoteEntry.js"
            },
            exposes: {},
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