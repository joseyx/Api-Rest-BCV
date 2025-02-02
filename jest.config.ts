/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: 'ts-jest',         // Le dice a Jest que use ts-jest para transformar archivos .ts y .tsx
  testEnvironment: 'node', 
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};