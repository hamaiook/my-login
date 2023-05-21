module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['next', 'prettier'],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['libs'],
  rules: {
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-sort-props': 'error',
    'react/self-closing-comp': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
}
