const path = require("path");

module.exports = {
  target: "node",
  entry: "./index.js", // Adjust the entry point according to your project structure
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "production",
  // Add any necessary loaders, plugins, or other configurations
};
