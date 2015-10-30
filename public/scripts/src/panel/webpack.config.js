module.exports = {
    entry: "./main.js",
    output: {
        filename: "../build/panel.js"
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
