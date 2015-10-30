module.exports = {
    entry: "./main.js",
    output: {
        filename: "../../build/root.js"
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
