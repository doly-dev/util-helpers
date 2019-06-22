import {
    expect
} from 'chai';

import type from '../src/type'

describe('type 类型检测', () => {
    describe('isArguments 检查值是否为Arguments', () => {
        it('arguments => true', () => {
            expect(type.isArguments(function () { return arguments }())).to.be.equal(true);
        });
        it('[1, 2, 3] => false', () => {
            expect(type.isArguments([1, 2, 3])).to.be.equal(false);
        });
    })

    describe('isArray 检查值是否为Array', () => {
        it('[] => true', () => {
            expect(type.isArray([])).to.be.equal(true);
        });
        it('1 => false', () => {
            expect(type.isArray(1)).to.be.equal(false);
        });
    })

    describe('isBoolean 检查值是否为Boolean', () => {
        it('false => true', () => {
            expect(type.isBoolean(false)).to.be.equal(true);
        });
        it('null => false', () => {
            expect(type.isBoolean(null)).to.be.equal(false);
        });
    })

    describe('isDate 检查值是否为Date', () => {
        it('new Date => true', () => {
            expect(type.isDate(new Date)).to.be.equal(true);
        });
        it('Mon April 23 2012 => false', () => {
            expect(type.isDate('Mon April 23 2012')).to.be.equal(false);
        });
    })

    describe('isError 检查值是否为Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError|DOMException', () => {
        it('new Error => true', () => {
            expect(type.isError(new Error)).to.be.equal(true);
        });
        it('Error => false', () => {
            expect(type.isError(Error)).to.be.equal(false);
        });
    })

    describe('isFunction 检查值是否为Function|AsyncFunction|GeneratorFunction|Proxy', () => {
        it('()=>{} => true', () => {
            expect(type.isFunction(() => { })).to.be.equal(true);
        });
        it('/abc/ => false', () => {
            expect(type.isFunction(/abc/)).to.be.equal(false);
        });
    })

    describe('isObject 检查值是否为Object', () => {
        it('{} => true', () => {
            expect(type.isObject({})).to.be.equal(true);
        });
        it('[1,2,3] => true', () => {
            expect(type.isObject([1, 2, 3])).to.be.equal(true);
        });
        it('null => false', () => {
            expect(type.isObject(null)).to.be.equal(false);
        });
    })

    describe('isNull 检查值是否为Null', () => {
        it('null => true', () => {
            expect(type.isNull(null)).to.be.equal(true);
        });
        it('false => false', () => {
            expect(type.isNull(false)).to.be.equal(false);
        });
    })

    describe('isNaN 检查值是否为NaN', () => {
        it('NaN => true', () => {
            expect(type.isNaN(NaN)).to.be.equal(true);
        });
        it('1 => false', () => {
            expect(type.isNaN(1)).to.be.equal(false);
        });
    })

    describe('isNumber 检查值是否为Number', () => {
        it('1 => true', () => {
            expect(type.isNumber(1)).to.be.equal(true);
        });
        it('Number.MIN_VALUE => true', () => {
            expect(type.isNumber(Number.MIN_VALUE)).to.be.equal(true);
        });
        it('Infinity => true', () => {
            expect(type.isNumber(Infinity)).to.be.equal(true);
        });
        it('NaN => true', () => {
            expect(type.isNumber(NaN)).to.be.equal(true);
        });
        it('"1" => false', () => {
            expect(type.isNumber("1")).to.be.equal(false);
        });
    })

    describe('isRegExp 检查值是否为RegExp', () => {
        it('/abc/ => true', () => {
            expect(type.isRegExp(/abc/)).to.be.equal(true);
        });
        it('"/abc/" => false', () => {
            expect(type.isRegExp('/abc/')).to.be.equal(false);
        });
    })

    describe('isString 检查值是否为String', () => {
        it('"abc" => true', () => {
            expect(type.isString('abc')).to.be.equal(true);
        });
        it('1 => false', () => {
            expect(type.isString(1)).to.be.equal(false);
        });
    })

    describe('isSymbol 检查值是否为Symbol', () => {
        it('Symbol.iterator => true', () => {
            expect(type.isSymbol(Symbol.iterator)).to.be.equal(true);
        });
        it('"abc" => false', () => {
            expect(type.isSymbol("abc")).to.be.equal(false);
        });
    })

    describe('isMap 检查值是否为Map', () => {
        it('new Map => true', () => {
            expect(type.isMap(new Map)).to.be.equal(true);
        });
        it('new WeakMap => false', () => {
            expect(type.isMap(new WeakMap)).to.be.equal(false);
        });
    })

    describe('isWeakMap 检查值是否为WeakMap', () => {
        it('new WeakMap => true', () => {
            expect(type.isWeakMap(new WeakMap)).to.be.equal(true);
        });
        it('new Map => false', () => {
            expect(type.isWeakMap(new Map)).to.be.equal(false);
        });
    })

    describe('isSet 检查值是否为Set', () => {
        it('new Set => true', () => {
            expect(type.isSet(new Set)).to.be.equal(true);
        });
        it('new WeakSet => false', () => {
            expect(type.isSet(new WeakSet)).to.be.equal(false);
        });
    })

    describe('isWeakSet 检查值是否为WeakSet', () => {
        it('new WeakSet => true', () => {
            expect(type.isWeakSet(new WeakSet)).to.be.equal(true);
        });
        it('new Set => false', () => {
            expect(type.isWeakSet(new Set)).to.be.equal(false);
        });
    })

    describe('isUndefined 检查值是否为Undefined', () => {
        it('undefined => true', () => {
            expect(type.isUndefined(undefined)).to.be.equal(true);
        });
        it('void 0 => true', () => {
            expect(type.isUndefined(void 0)).to.be.equal(true);
        });
        it('null => false', () => {
            expect(type.isUndefined(null)).to.be.equal(false);
        });
    })
})