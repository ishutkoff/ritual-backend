module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next'],
    rules: {
    // semi: ['error', 'never'],
    // quotes: [2, 'single'],
        'react/jsx-indent': [2, 4],
        indent: [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': [2, {
            extensions: ['.js', '.jsx', 'tsx'],
        }],
        'react/react-in-jsx-scope': 'off',
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'react/function-component-definition': 'off',
        'react/require-default-props': 'off',
        'linebreak-style': [2, 'unix'],
        'no-unused-vars': 'warn',
        'react/jsx-props-no-spreading': 'warn',
        'import/no-extraneous-dependencies': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': [2, { markupOnly: true }],
        'max-len': ['error', { ignoreComments: true }],
    },
    globals: {
        __IS_DEV__: true,
    },
};
