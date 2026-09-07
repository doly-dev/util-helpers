// ref: https://commitlint.js.org/reference/configuration.html
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [0],
    'body-max-line-length': [2, 'always', 300]
  }
};
