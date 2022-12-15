import type { Config } from 'jest';
import { version } from '../package.json';

const config: Config = {
  globals: {
    BUILD_VERSION: version,
  },
};

export default config;
