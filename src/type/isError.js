import isType from './isType';

/**
 * 检查值是否为Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError|DOMException
 * 
 * @module type/isError
 * @since 1.1.0
 * @param {*} value 检查值
 * @returns {Boolean} 是否为Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError|DOMException
 * @example
 *
 * isError(new Error)
 * // => true
 *
 * isError(Error)
 * // => false
 */
function isError(value) {
    return isType(value, 'Error') || isType(value, 'DOMException');
}

export default isError