/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: `${__dirname}/scripts/testBootstrap.ts`,
  globalTeardown: `${__dirname}/scripts/testTeardown.ts`,
};
