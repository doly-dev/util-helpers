
const toString = Object.prototype.toString;

/**
 * 类型检测
 * @param {any} obj 任意数据
 * @param {String} typeName 类型名称
 */
function isType(obj, typeName=''){
    if(typeof typeName !== 'string'){
        console.log('参数错误');
        return false;
    }

    typeName = typeName[0] ? typeName[0].toUpperCase() + typeName.slice(1) : typeName;

    return toString.call(obj) === `[object ${typeName}]`;
}

export default isType;