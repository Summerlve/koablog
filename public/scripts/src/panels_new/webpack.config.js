module.exports = {
    entry: "./main.js",
    output: {
        filename: "../../build/panels_new.js"
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
