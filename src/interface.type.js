// 交换字段名
/**
 * @template {*} D
 * @template {Record<string, keyof D>} F
 * @typedef {Omit<D, F[keyof F]> & { [P in keyof F]: D[F[P]] }} ExchangeFieldNames
 */

// 交换字段名，支持嵌套
// 先排除子级字段名，再交换字段名，然后加上子级字段名，再替换一次。
/**
 * @template {*} D
 * @template {Record<string, any>} F
 * @template {string} C
 * @typedef {(C extends keyof D ? ExchangeFieldNames<Omit<D, C> & Record<C, TransformFieldNames<D, F, C>>, F> : ExchangeFieldNames<D, F>)[]} TransformFieldNames
 */

export { };