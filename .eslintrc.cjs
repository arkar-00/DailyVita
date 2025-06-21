module.exports = {
  extends: ['expo', 'prettier', 'plugin:no-switch-statements/recommended'],
  plugins: ['prettier', 'no-switch-statements'],
  rules: {
    'prettier/prettier': 'error',
    'no-switch-statements/no-switch': 'error',
    'lines-between-class-members': ['error', 'always'],
  },
}
