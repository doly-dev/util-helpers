import {
    expect
} from 'chai';

import replaceChar from '../../src/processor/replaceChar';

describe('replaceChar', () => {
    it(`手机号显示前三后四 "13000000000" => 130****0000`, () => {
        expect(replaceChar('13000000000')).to.be.equal('130****0000');
    });
    it(`身份证号显示前三后四 "130701199310302288" => 130***********2288`, () => {
        expect(replaceChar('130701199310302288')).to.be.equal('130***********2288');
    });
    it(`邮箱显示前两位和@后面内容，替换字符固定4位 "12345@qq.com" => 12****@qq.com`, () => {
        const email = '12345@qq.com'
        expect(replaceChar(email, { start: 2, end: email.indexOf('@'), repeat: 4 })).to.be.equal('12****@qq.com');
    });
    it(`邮箱显示前两位和@后面内容，替换字符改为"."，固定4位 "12345@qq.com" => 12....@qq.com`, () => {
        const email = '12345@qq.com'
        expect(replaceChar(email, { start: 2, end: email.indexOf('@'), char: '.', repeat: 4 })).to.be.equal('12....@qq.com');
    });
    it(`银行卡号显示后四位，替换字符固定4位 "6228480402564890018" => ****0018`, () => {
        expect(replaceChar('6228480402564890018', { start: 0, end: -4, repeat: 4 })).to.be.equal('****0018');
    });
    it(`带格式的银行卡号显示前四后四，排除空格 "6228 4804 0256 4890 018" => 6228 **** **** **** 018`, () => {
        expect(replaceChar('6228 4804 0256 4890 018', { start: 4, end: -4, exclude: ' ' })).to.be.equal('6228 **** **** **** 018');
    });
    it(`用户名显示前后一位 "林某某" => 林*某`, () => {
        expect(replaceChar('林某某', { start: 1, end: -1, repeat: 1 })).to.be.equal('林*某');
    });
})