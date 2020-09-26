module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: ['<rootDir>/src/*.ts?(x)'],
};
