const{resolve}=require("path");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const webpack=require("webpack");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlWebpackPlugin=require('add-asset-html-webpack-plugin');
// process.env.NODE_ENV = 'production';

module.exports={
    entry:"./src/index.ts",
    output:{
        filename:"js/build.[contenthash:10].js",
        path:resolve(__dirname,"out")
    },
    resolve: {
       
        extensions: [".ts", ".tsx", ".js"]
      },
    module:{
        rules:[
            {
                test:/\.js$/,
                 exclude:/node_modules/,
                 enforce:"pre",
                 loader:"eslint-loader",
                options:{
                    fix:true
                }
            },
            {
            oneOf:[ 
                {
                //  js兼容性处理
                test:/\.js$/,
                exclude:/node_modules/,
                    loader:"babel-loader",
                    options:{
                        presets:["@babel/preset-env"],
                        cacheDirectory:true
                    }
                },
                {
                    test:/\.ts$/,
                    exclude:/node_modules/,
                    use:"ts-loader",
                    

                },
                {
                    test:/\.less$/,
                    use:[
                        
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            //css兼容性处理
                            loader:"postcss-loader",
                            options:{
                                postcssOptions:{
                                ident:"postcss",
                                plugins:[
                                    require("postcss-preset-env")()
                                ]
                            }
                        }
                        },
                        "less-loader"
                    ]
                    
                },
                {
                    test:/\.(jpg|png|gif)$/,
                    loader:"url-loader",
                    options:{
                        limit:19,
                        esModule:false,
                        name:"[contenthash:10].[ext]",
                        outputPath:"img"
    
                    }
                },
                {
                    test:/\.html$/,
                    loader:"html-loader",
                    options:{
                        esModule:false   
                    }
    }]
}
            ]
        },
         
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            minify:{collapseWhitespace:true,
                removeComments:true
            }
        }),
        new MiniCssExtractPlugin({
            filename:"css/build.[contenthash:10].css"
        }),
        // css压缩
        new OptimizeCssAssetsWebpackPlugin(),
        new webpack.DllReferencePlugin({
            manifest:resolve(__dirname,"dll/manifest.json")
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath:resolve(__dirname,"dll/jquery.js"),
            outputPath:"./js",
            publicPath:"./js"
            
        })
      
        
    ],
    mode:"development",
    devServer:{
        contentBase:resolve(__dirname,"out"),
        compress:true,
        port:3000,
        open:true,
        hot:true

    },
    // devtool:"nosources-source-map"
    
    


}