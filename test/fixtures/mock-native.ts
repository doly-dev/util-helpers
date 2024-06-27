const blobUrl = 'blob://xxx';
jest.mock('../../src/utils/native.ts', () => {
  const originalModule = jest.requireActual('../../src/utils/native.ts');

  return {
    ...originalModule,
    createObjectURL: jest.fn(() => blobUrl),
    revokeObjectURL: jest.fn()
  };
});
