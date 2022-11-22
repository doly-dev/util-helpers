import { version } from '../package.json';

/** @type {import('jest').Config} */
const config = {
  globals: {
    BUILD_VERSION: version,
  },
};

module.exports = config;
