/**
 * @jest-environment jsdom
 * @jest-environment-options { "resources": "usable", "runScripts": "dangerously"}
 */
import './fixtures/mock-native';
import { loadImage } from '../src';
import { mockImage, restoreImage, setImageLoadStatus } from './fixtures/mockImage';
import { createSpyConsoleError } from './fixtures/spyConsole';

const url = 'https://dummyimage.com/200x300';
const blobUrl = 'blob://xxx';
const TIMEOUT = 60 * 1000;

const spyConsoleError = createSpyConsoleError();
mockImage();

describe('loadImage', () => {
  beforeEach(() => {
    setImageLoadStatus(true);
    spyConsoleError.mockClear();
  });

  afterAll(() => {
    spyConsoleError.mockRestore();
    restoreImage();
  });

  it(
    '加载 blob 图片',
    async () => {
      const image = await loadImage(new Blob(['hello world']));
      expect(image.crossOrigin).not.toBe('anonymous');
      expect(image.src).toBe(blobUrl);
    },
    TIMEOUT
  );

  it(
    '加载 url 图片',
    async () => {
      const image = await loadImage(url);
      expect(image.crossOrigin).toBe('anonymous');
      expect(image.src).toBe(url);
    },
    TIMEOUT
  );

  it(
    '加载失败',
    async () => {
      expect(spyConsoleError).toHaveBeenCalledTimes(0);
      setImageLoadStatus(false);
      try {
        await loadImage(url);
      } catch (err: any) {
        // spy image error message
        expect(err.message).toBe('load error');
      }
      expect(spyConsoleError).toHaveBeenCalledTimes(1);

      try {
        await loadImage(new Blob(['hello world']));
      } catch (err: any) {
        // spy image error message
        expect(err.message).toBe('load error');
      }
      expect(spyConsoleError).toHaveBeenCalledTimes(2);
    },
    TIMEOUT
  );
});
