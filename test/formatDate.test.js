import {
    expect
} from 'chai';

import formatDate from '../src/formatDate';

const localeZone = new Date().getTimezoneOffset()/60;

const fmt = 'yyyy-MM-dd hh:mm:ss';

const timestamp = 1560960938322; // 1560960938322 => 2019-06-20 00:15:38
const timestring = '2019-06-20 00:15:38';

const fmt1 = 'yyyy年MM月dd日'; // 年月日
const fmt1Ret = '2019年06月20日';

const fmt2 = 'hh:mm:ss'; // 时分秒
const fmt2Ret = '00:15:38';

const fmt3 = 'hh mm'; // 时分
const fmt3Ret = '00 15';

const bjZoneOpts = {utcOffset: -8};

describe('formatDate 格式化日期时间。由于不确定构建机本地时区，测试用例除日期字符串外，统一设置为东八区，即 utcOffset=-8', () => {
    it(`时间戳 ${timestamp} => ${timestring}`, () => {
        expect(formatDate(timestamp, fmt, bjZoneOpts)).to.be.equal(timestring);
    });
    it(`日期字符串，默认当地时区 "${timestring}" => ${timestring}`, () => {
        expect(formatDate(timestring, fmt)).to.be.equal(timestring);
    });
    it(`日期对象 new Date(${timestamp}) => ${timestring}`, () => {
        expect(formatDate(new Date(timestamp), fmt, bjZoneOpts)).to.be.equal(timestring);
    });
    it(`年月日 ${fmt1} => ${fmt1Ret}`, () => {
        expect(formatDate(timestamp, fmt1, bjZoneOpts)).to.be.equal(fmt1Ret);
    });
    it(`时分秒 ${fmt2} => ${fmt2Ret}`, () => {
        expect(formatDate(timestamp, fmt2, bjZoneOpts)).to.be.equal(fmt2Ret);
    });
    it(`时分 ${fmt3} => ${fmt3Ret}`, () => {
        expect(formatDate(timestamp, fmt3, bjZoneOpts)).to.be.equal(fmt3Ret);
    });
    it(`当前北京时间 => ${formatDate(new Date(), fmt, bjZoneOpts)}`, () => {
        expect(formatDate(new Date(), fmt, bjZoneOpts)).to.be.ok;
    });
})