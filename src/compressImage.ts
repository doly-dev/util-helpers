import { toNumber } from 'ut2';
import loadImageWithBlob from './loadImageWithBlob';

function canvasToBlob(canvas: HTMLCanvasElement, type?: string, quality?: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      type,
      quality
    );
  });
}

// 压缩图片信息
type Info = {
  image: HTMLImageElement; // 图片元素
  blob: Blob; // 图片 blob 对象
  canvas: HTMLCanvasElement; // canvas 元素
  context: CanvasRenderingContext2D; // canvas 2D 渲染上下文
};

type Options = {
  // 图片配置
  width?: number; // 自定义图片宽度。默认图片自身宽度
  height?: number; // 自定义图片高度。默认图片自身高度
  rotate?: number; // 旋转角度
  offset?: [number, number] | ((info: Info, options: Options) => [number, number]); // 偏移值

  // 画布配置
  background?: string; // 背景色。默认白色
  canvasWidth?: number | ((info: Info, options: Options) => number); // 画布宽度。默认图片宽度
  canvasHeight?: number | ((info: Info, options: Options) => number); // 画布高度。默认图片高度

  // 导出配置
  format?: 'blob' | 'dataURL'; // 导出格式。默认 blob
  type?: string; // 图片类型。默认 image/jpeg
  quality?: number; // 图片质量。默认 0.8

  // 钩子方法
  beforeCompress?: (imageWithBlob: Pick<Info, 'image' | 'blob'>, options: Options) => void; // 压缩前触发
  beforeDraw?: (info: Info, options: Options) => void; // 画之前
  afterDraw?: (info: Info, options: Options) => void; // 画之后

  // 其他
  cacheImage?: boolean; // 缓存上一次加载成功的图片
  ajaxOptions?: Parameters<typeof loadImageWithBlob>[2];
};

function compressImage(img: string | Blob, options: Omit<Options, 'format'> & { format: 'dataURL' }): Promise<string>;
function compressImage(img: string | Blob, options?: Options): Promise<Blob>;
/**
 * 压缩图片。
 *
 * <em style="font-weight: bold;">注意：该方法仅适用于浏览器端。</em>
 *
 * <em style="font-weight: bold;">如果是半透明图片并且导出 `image/png` 格式，建议将背景变成透明 `background=transparent`，避免出现白边。注意正常图片压缩导出 `image/png` 格式后文件可能会比原图大。</em>
 *
 * @static
 * @alias module:Other.compressImage
 * @since 4.20.0
 * @see {@link https://sytpwg.csb.app/ | 在线示例}
 * @param {string | Blob} img 图片地址或 blob 对象
 * @param {Object} [options] 配置项
 * @param {number} [options.width] 自定义图片宽度，默认图片自身宽度
 * @param {number} [options.height] 自定义图片高度，默认图片自身高度
 * @param {number} [options.rotate] 旋转
 * @param {Array | function} [options.offset=[0, 0]] x,y轴偏移值
 * @param {string} [options.background=#fff] 背景颜色
 * @param {number | function} [options.canvasWidth] 画布宽度，默认图片宽度
 * @param {number | function} [options.canvasHeight] 画布高度，默认图片高度
 * @param {'blob' | 'dataURL'} [options.format='blob'] 导出格式
 * @param {string} [options.type='image/jpeg'] 图片类型
 * @param {number} [options.quality=0.8] 图片质量
 * @param {function} [options.beforeCompress] 图片加载完成，画布创建之前调用
 * @param {function} [options.beforeDraw] 图片载入画布之前调用
 * @param {function} [options.afterDraw] 图片载入画布之后调用
 * @param {boolean} [options.cacheImage=true] 缓存最近一次加载成功的图片，当图片地址或 blob 对象一致时，直接使用该缓存图片。避免连续请求同一个图片资源，重复加载问题。
 * @param {AjaxOptions} [options.ajaxOptions] ajax 请求配置项，当传入的图片为字符串时才会触发请求。
 * @returns {Promise<Blob | string>} blob 对象 或 data url 图片
 * @example
 *
 * // 默认返回压缩后的 blob 对象
 * compressImage(file).then(blob=>{
 *    // do something
 * });
 *
 * // 设置返回格式 data url
 * compressImage(file, { format: 'dataURL' }).then(url=>{
 *    // do something
 * });
 *
 * // 自定义配置
 * compressImage('https://dummyimage.com/200x300', {
 *  width: 100,
 *  height: 100,
 *  quality: 0.5,
 *  beforeCompress({ image, blob }){},
 *  beforeDraw({ image, blob, canvas, context }){}
 *  afterDraw({ image, blob, canvas, context }){}
 * }).then(blob=>{
 *   // do something
 * });
 *
 * // 支持不同形式的图片文件
 * compressImage('data:image/png;base64,PGEgaWQ9ImEiPjxiIGlkPSJiIj5oZXkhPC9iPjwvYT4=').then(blob=>{
 *   // do something
 * });
 *
 */
function compressImage(img: string | Blob, options: Options = {}) {
  return new Promise((resolve, reject) => {
    const {
      width,
      height,
      rotate,
      offset = [0, 0],
      cacheImage = true,

      background = '#fff',
      canvasWidth,
      canvasHeight,

      format = 'blob',
      type = 'image/jpeg',
      quality = 0.8,

      beforeCompress,
      beforeDraw,
      afterDraw,

      ajaxOptions
    } = options;

    // 加载图片
    loadImageWithBlob(img, cacheImage, ajaxOptions)
      .then(({ image, blob }) => {
        const numWidth = toNumber(width);
        const numHeight = toNumber(height);
        const numQuality = toNumber(quality);

        // 自定义图片宽高
        if (numWidth) {
          image.width = numWidth;
        }
        if (numHeight) {
          image.height = numHeight;
        }

        beforeCompress?.({ image, blob }, options);

        // 创建 canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const info = { image, blob, canvas, context: ctx };

        // 设置 canvas 宽高
        const numCanvasWidth = toNumber(typeof canvasWidth === 'function' ? canvasWidth(info, options) : canvasWidth);
        const numCanvasHeight = toNumber(typeof canvasHeight === 'function' ? canvasHeight(info, options) : canvasHeight);
        canvas.width = numCanvasWidth || image.width;
        canvas.height = numCanvasHeight || image.height;

        // 填充背景色
        if (background === 'none' || background === 'transparent') {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 旋转/变换/偏移
        // 如果设置了旋转，自动将原点设置为图片中心，并调整偏移值。
        let internalOffset = [0, 0];
        if (rotate !== undefined) {
          ctx.translate(image.width / 2, image.height / 2);
          internalOffset = [-image.width / 2, -image.height / 2];
          ctx.rotate((rotate * Math.PI) / 180);
        }
        const outOffset = typeof offset === 'function' ? offset(info, options) : offset;

        beforeDraw?.(info, options);

        // 将图像载入 canvas 中
        const dx = internalOffset[0] + toNumber(outOffset[0]);
        const dy = internalOffset[1] + toNumber(outOffset[1]);
        ctx.drawImage(image, dx, dy, image.width, image.height);

        // 处理png图片透明背景
        if (type === 'image/png') {
          ctx.globalCompositeOperation = 'destination-in';
          ctx.drawImage(image, dx, dy, image.width, image.height);
        }

        afterDraw?.(info, options);

        // 导出压缩后的图片
        if (format === 'blob') {
          canvasToBlob(canvas, type, numQuality).then(resolve).catch(reject);
        } else {
          resolve(canvas.toDataURL(type, numQuality));
        }
      })
      .catch(reject);
  });
}

export default compressImage;
