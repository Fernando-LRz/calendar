module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],

    // Sólo si es necesario importar CSS en los componentes para testing
    moduleNameMapper: {
        '\\.(css\less)$': '<rootDir>/tests/mocks/styleMock.js'
    }
}