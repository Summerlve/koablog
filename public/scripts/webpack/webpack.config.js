module.exports = {
    entry: "./main.js",
    output: {
        filename: "../app.js"
    },
    module: {
        loaders: [
          {
            test: /\.vue$/,
            loader: "vue"
          }
        ]
    }
};
