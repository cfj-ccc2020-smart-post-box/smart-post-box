module.exports = {
  roots: ['<rootDir>/server'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/server/api/services/*.ts?(x)'],
};
