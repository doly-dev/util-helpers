/**
 * 类型检测
 *
 * @module type
 * @since 1.1.0
 * @requires type/isArguments
 * @requires type/isDate
 * @requires type/isRegExp
*/

import isArguments from './isArguments'
import isDate from './isDate'
import isRegExp from './isRegExp'

export default {
    isArguments,
    isDate,
    isRegExp
}