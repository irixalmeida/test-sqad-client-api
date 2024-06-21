module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "__mocks__/(.*)": "<rootDir>/__mocks__/$1",
  },
};
