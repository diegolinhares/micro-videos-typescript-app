export default {
  displayName: {
    name: "@core",
    color: "blue"
  },
  clearMocks: true,
  coverageDirectory: "<rootDir>/../__coverage",
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    },
  },
  coverageProvider: "v8",
  rootDir: "src",
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["@swc/jest"],
  },
  setupFilesAfterEnv: ["./@seedwork/domain/tests/validations.ts"]
};
