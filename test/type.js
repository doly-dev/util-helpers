import {
    expect
} from 'chai';

import type from '../src/type'

describe('type 类型检测', () => {
    describe('isArguments 检查值是否为Arguments类型', () => {
        it('arguments => true', () => {
            expect(type.isArguments(function () { return arguments }())).to.be.equal(true);
        });
        it('[1, 2, 3] => false', () => {
            expect(type.isArguments([1, 2, 3])).to.be.equal(false);
        });
    })

    describe('isDate 检查值是否为Date类型', () => {
        it('new Date => true', () => {
            expect(type.isDate(new Date)).to.be.equal(true);
        });
        it('Mon April 23 2012 => false', () => {
            expect(type.isDate('Mon April 23 2012')).to.be.equal(false);
        });
    })

    describe('isRegExp 检查值是否为RegExp类型', () => {
        it('/abc/ => true', () => {
            expect(type.isRegExp(/abc/)).to.be.equal(true);
        });
        it('"/abc/" => false', () => {
            expect(type.isRegExp('/abc/')).to.be.equal(false);
        });
    })
})