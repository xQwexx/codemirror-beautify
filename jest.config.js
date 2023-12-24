export default {
    "modulePaths": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "<rootDir>/test/specs/**.ts"
    ],
    "moduleFileExtensions": [
      "js",
      "ts"
    ],
    "verbose": true,
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testEnvironment": "jsdom"
  }