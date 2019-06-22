/**
 * 类型检测
 *
 * @module type
 * @since 1.1.0
 * @requires type/isArguments
 * @requires type/isDate
 * @requires type/isRegExp
 * @requires type/isFunction
*/

import isArguments from './isArguments'
import isDate from './isDate'
import isRegExp from './isRegExp'
import isFunction from './isFunction'

export default {
    isArguments,
    isDate,
    isRegExp,
    isFunction
}