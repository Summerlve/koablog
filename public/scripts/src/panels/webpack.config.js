module.exports = {
    entry: "./main.js",
    output: {
        filename: "../../build/panels.js"
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
