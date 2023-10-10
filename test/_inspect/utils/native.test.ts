jest.mock('../../../src/utils/setup.ts', () => {
  const originalModule = jest.requireActual('../../../src/utils/setup.ts');

  return {
    ...originalModule,
    URLExisted: false
  };
});

import { createObjectURL, revokeObjectURL } from '../../../src/utils/native';

describe('native', () => {
  it('should be defined', () => {
    expect(createObjectURL).toBeDefined();
    expect(revokeObjectURL).toBeDefined();
  });
});
