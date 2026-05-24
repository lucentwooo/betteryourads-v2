const path = require("node:path");
const { defineConfig } = require("vitest/config");

module.exports = defineConfig({
  test: {
    environment: "node"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
});
