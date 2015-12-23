module.exports = {
    entry: "./main.js",
    output: {
        filename: "../../build/roots.js"
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
