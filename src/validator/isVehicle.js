import check from './check'

/**
 * 检测值是否为车牌号
 * 
 * @alias module:validator.isVehicle
 * @since 1.1.0
 * @param {String} value 要检测的值
 * @returns {Boolean} 值是否为车牌号
 * @example 
 * 
 * import { isVehicle } from "util-helpers";
 * 
 * isVehicle('京L88888');
 * // => true
 *
 * isVehicle('333333');
 * // => false
 * 
 */
function isVehicle(value) {
    return check(value, 'vehicle');
}

export default isVehicle;