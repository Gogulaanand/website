module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setupTests.js"],
  modulePaths: ["node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
};
