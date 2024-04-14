module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: '.'
      }
    }
  },
  ignorePatterns: ['lib', '.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.server.json'],
    sourceType: 'module'
  },
  plugins: [
    'react-refresh',
    'import'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/consistent-type-exports': [1, { fixMixedExportsWithInlineTypeSpecifier: true }],
    '@typescript-eslint/consistent-type-imports': [1, { disallowTypeAnnotations: false }],
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/no-floating-promises': [1, { ignoreIIFE: true, ignoreVoid: true }],
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/semi': [2, 'never'],
    'arrow-parens': [2, 'always'],
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 2,
    'import/order': [2, { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'], 'newlines-between': 'never' }],
    'import/prefer-default-export': 'off',
    'linebreak-style': [2, 'unix'],
    'no-console': [2, { allow: ['warn', 'error'] }],
    'no-param-reassign': 2,
    'no-restricted-syntax': 2,
    'padded-blocks': [2, 'never'],
    quotes: [2, 'single', { avoidEscape: true }],
    'max-len': [2, {
      code: 80,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }]
  }
}
