module.exports = {
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: [
        'js',
        'ts'
    ],
    testMatch: [
        '**/test/**/*.test.(ts|js)'
    ],
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
}