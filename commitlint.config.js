module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type case should be lowercase
    'type-case': [2, 'always', 'lower-case'],
    // Subject case should be lowercase
    'subject-case': [2, 'always', 'lower-case'],
    // Subject should not be empty
    'subject-empty': [2, 'never'],
    // Allow longer commit messages for detailed descriptions
    'body-max-line-length': [0, 'always'],
    'footer-max-line-length': [0, 'always'],
  },
}
