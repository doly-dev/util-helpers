import { expect } from 'chai';

import isType from '../../src/common/isType';

['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet']

describe('common/isType 类型检测', ()=>{
    it('类型名称支持首字母小写 => true', ()=>{
        expect(isType(arguments, 'arguments')).to.be.equal(true);
    });
    it('Arguments => true', ()=>{
        expect(isType(arguments, 'Arguments')).to.be.equal(true);
    });
    it('Function => true', ()=>{
        expect(isType(()=>{}, 'Function')).to.be.equal(true);
    });
    it('RegExp => true', ()=>{
        expect(isType(/\d/, 'RegExp')).to.be.equal(true);
    });
    it('String => true', ()=>{
        expect(isType('', 'String')).to.be.equal(true);
    });
    it('Symbol => true', ()=>{
        expect(isType(Symbol(), 'Symbol')).to.be.equal(true);
    });
    it('Undefined => true', ()=>{
        expect(isType(undefined, 'Undefined')).to.be.equal(true);
    });
})
