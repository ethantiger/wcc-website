export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/firestore.rules.test.js'],
  testTimeout: 30000,
  verbose: true,
  transformIgnorePatterns: [
    'node_modules/(?!(@firebase|firebase)/)'
  ]
};