const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$';

module.exports = {
  notify: true,
  verbose: true,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  testRegex: TEST_REGEX,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // snapshotSerializers: ['enzyme-to-json/serializer'],
  // setupTestFrameworkScriptFile: './jest.setup.ts',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/lib/']
};
