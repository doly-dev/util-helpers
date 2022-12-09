// @ts-nocheck

// 交换字段名
/**
 * @template {*} D
 * @template {Object.<string, keyof D>} F
 * @typedef {Omit<D, F[keyof F]> & { [P in keyof F]: D[F[P]] }} ExchangeFieldNames
 */

// 交换字段名，支持嵌套
// 先排除子级字段名，再交换字段名，然后加上子级字段名，再替换一次。这里的 F 有类型问题，因为排除了子级字段名，暂时没有比较好的方案处理。
/**
 * @template {*} D
 * @template {Object.<string, keyof D>} F
 * @template {string} C
 * @typedef {(C extends keyof D ? ExchangeFieldNames<Omit<D, C> & Record<C, TransformFieldNames<D, F, C>>, F> : ExchangeFieldNames<D, F>)[]} TransformFieldNames
 */

export { };