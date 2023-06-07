import pkg from '../package.json';
import { version, VERSION } from '../src';

describe('config', () => {
  it('should be defined', () => {
    expect(version).toBeDefined();
    expect(VERSION).toBeDefined();
  });

  it('equal package.json version', () => {
    expect(version).toBe(pkg.version);
    expect(VERSION).toBe(pkg.version);
  });
});
