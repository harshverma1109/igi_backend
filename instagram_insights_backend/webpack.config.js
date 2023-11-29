const path = require("path");

module.exports = {
  entry: "./index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file
  },
  mode: "production", // Set the mode to 'production'
  // Other configurations as needed
};
