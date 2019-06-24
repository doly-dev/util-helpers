import {
    expect
} from 'chai';

import isPassword from '../../src/validator/isPassword'

describe('isPassword', () => {
    it('非字符串 => false', () => {
        expect(isPassword(true)).to.be.equal(false);
        expect(isPassword(123)).to.be.equal(false);
    });
    it('"a12345678" => true', () => {
        expect(isPassword('a12345678')).to.be.equal(true);
    });
    it('3级强度 "a12345678" => false', () => {
        expect(isPassword('a12345678', { level: 3 })).to.be.equal(false);
    });
    it('3级强度 "Aa12345678" => true', () => {
        expect(isPassword('Aa12345678', { level: 3 })).to.be.equal(true);
    });
    it('3级强度，忽略大小写 "Aa12345678" => false', () => {
        expect(isPassword('Aa12345678', { level: 3, ignoreCase: true })).to.be.equal(false);
    });
    it('3级强度，忽略大小写 "_Aa12345678" => true', () => {
        expect(isPassword('_Aa12345678', { level: 3, ignoreCase: true })).to.be.equal(true);
    });
    it('3级强度，忽略大小写 " _Aa12345678" => true', () => {
        expect(isPassword(' _Aa12345678', { level: 3, ignoreCase: true })).to.be.equal(true);
    });
})