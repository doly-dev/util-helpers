import {
    expect
} from 'chai';

import formatDate from '../src/formatDate';

const timestamp = 1560960938322; // 1560960938322 => 2019-06-20 00:15:38
const timestampFmt = '2019-06-20 00:15:38';

const fmt1 = 'yyyy-MM-dd'; // 年月日
const fmt1Ret = '2019-06-20';

const fmt2 = 'hh:mm:ss'; // 时分秒
const fmt2Ret = '00:15:38';

const fmt3 = 'hh:mm'; // 时分
const fmt3Ret = '00:15';

describe('formatDate 格式化日期时间', () => {
    it(`时间戳 ${timestamp} => ${timestampFmt}`, () => {
        expect(formatDate(timestamp)).to.be.equal(timestampFmt);
    });
    it(`日期字符串 "${timestampFmt}" => ${timestampFmt}`, () => {
        expect(formatDate(timestampFmt)).to.be.equal(timestampFmt);
    });
    it(`日期对象 new Date(${timestamp}) => ${timestampFmt}`, () => {
        expect(formatDate(new Date(timestamp))).to.be.equal(timestampFmt);
    });
    it(`年月日 ${fmt1} => ${fmt1Ret}`, () => {
        expect(formatDate(timestamp, fmt1)).to.be.equal(fmt1Ret);
    });
    it(`时分秒 ${fmt2} => ${fmt2Ret}`, () => {
        expect(formatDate(timestamp, fmt2)).to.be.equal(fmt2Ret);
    });
    it(`时分 ${fmt3} => ${fmt3Ret}`, () => {
        expect(formatDate(timestamp, fmt3)).to.be.equal(fmt3Ret);
    });
})