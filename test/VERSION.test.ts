import pkg from '../package.json';
import { VERSION } from '../src';

describe('config', () => {
  it('should be defined', () => {
    expect(VERSION).toBeDefined();
  });

  it('equal package.json version', () => {
    expect(VERSION).toBe(pkg.version);
  });
});
