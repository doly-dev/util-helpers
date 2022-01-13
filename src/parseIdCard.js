import isIdCard from './isIdCard';

const regIdCard = /^(?<province>\d{2})(?<city>\d{2})(?<area>\d{2})(?<year>(?:\d{2})?\d{2})(?<month>\d{2})(?<day>\d{2})\d{2}(?<gender>\d)(?:\d|X)?$/i;

const Provinces = [
  // 华北地区：北京市|110000，天津市|120000，河北省|130000，山西省|140000，内蒙古自治区|150000
  ['11', '北京市'],
  ['12', '天津市'],
  ['13', '河北省'],
  ['14', '山西省'],
  ['15', '内蒙古自治区'],

  // 东北地区： 辽宁省|210000，吉林省|220000，黑龙江省|230000
  ['21', '辽宁省'],
  ['22', '吉林省'],
  ['23', '黑龙江省'],

  // 华东地区： 上海市|310000，江苏省|320000，浙江省|330000，安徽省|340000，福建省|350000，江西省|360000，山东省|370000
  ['31', '上海市'],
  ['32', '江苏省'],
  ['33', '浙江省'],
  ['34', '安徽省'],
  ['35', '福建省'],
  ['36', '江西省'],
  ['37', '山东省'],

  // 华中地区： 河南省|410000，湖北省|420000，湖南省|430000
  ['41', '河南省'],
  ['42', '湖北省'],
  ['43', '湖南省'],

  // 华南地区：广东省|440000，广西壮族自治区|450000，海南省|460000
  ['44', '广东省'],
  ['45', '广西壮族自治区'],
  ['46', '海南省'],

  // 西南地区：重庆市|500000，四川省|510000，贵州省|520000，云南省|530000，西藏自治区|540000
  ['50', '重庆市'],
  ['51', '四川省'],
  ['52', '贵州省'],
  ['53', '云南省'],
  ['54', '西藏自治区'],

  // 西北地区： 陕西省|610000，甘肃省|620000，青海省|630000，宁夏回族自治区|640000，新疆维吾尔自治区|650000
  ['61', '陕西省'],
  ['62', '甘肃省'],
  ['63', '青海省'],
  ['64', '宁夏回族自治区'],
  ['65', '新疆维吾尔自治区'],

  // 台湾地区：台湾省|710000
  // 台湾居民公民身份号码地址码为830000，参考 http://www.wanweibaike.com/wiki-中华人民共和国行政区划代码_(7区)、https://zh.wikipedia.org/wiki/港澳台居民居住证
  ['71', '台湾省'],
  ['83', '台湾省'],

  // 港澳地区：香港特别行政区|810000，澳门特别行政区|820000
  ['81', '香港特别行政区'],
  ['82', '澳门特别行政区']
];

// 第一位数字是以前的大区制代码。第二位是大区所在省市编码。全国共分为8个大区：华北（1）、东北（2）、华东（3）、中南（4）、西南（5）、西北（6）、台湾（7）和港澳（8）。
// const Regions = [
//   ['1', '华北地区'],
//   ['2', '东北地区'],
//   ['3', '华东地区'],
//   ['4', '中南地区'],
//   ['5', '西南地区'],
//   ['6', '西北地区'],
//   ['7', '台湾地区'],
//   ['8', '港澳地区']
// ];

/**
 * 解析身份证号码，支持15、18位身份证号码
 * 
 * @static
 * @alias module:Processor.parseIdCard
 * @since 4.0.0
 * @see 参考 {@link https://baike.baidu.com/item/居民身份证号码|居民身份证号码}
 * @param {string} id 身份证号码，支持15位
 * @returns null 或 省份、生日、性别，省/市/区/年/月/日/性别编码
 * @example
 * parseIdCard('123456789123456');
 * // => null
 * 
 * // 18位身份证号码
 * parseIdCard('130701199310302288')
 * // =>
 * {
  birthday: "1993-10-30",
  gender: "女",
  origin: { province: "13", city: "07", area: "01", year: "1993", month: "10", day: "30", gender: "8" },
  province: "河北省"
}
 * // 15位身份证号码
 * parseIdCard('130701931030228');
 * // =>
 * {
  birthday: "93-10-30",
  gender: "女",
  origin: { province: "13", city: "07", area: "01", year: "93", month: "10", day: "30", gender: "8" },
  province: "河北省"
}
 * 
 */
function parseIdCard(id) {
  if (!isIdCard(id, { loose: true })) {
    return null;
  }

  const info = regIdCard.exec(id);

  if (!info) {
    return null;
  }

  /**
   * @type {{ province: string, city: string, area: string, year: string, month: string, day: string, gender: string }}
   *
   */
  let origin = {
    province: '',
    city: '',
    area: '',
    year: '',
    month: '',
    day: '',
    gender: ''
  };

  if (info.groups) {
    // @ts-ignore
    origin = info.groups;
  } else {
    origin = {
      province: info[1],
      city: info[2],
      area: info[3],
      year: info[4],
      month: info[5],
      day: info[6],
      gender: info[7]
    };
  }

  const province = Provinces.find((item) => item[0] === origin.province);

  if (!province) {
    return null;
  }

  const birthday = `${origin.year}-${origin.month}-${origin.day}`;
  const gender = Number(origin.gender) % 2 === 0 ? '女' : '男';
  // const region = Regions.find(item => item[0] === origin.province?.substring(0, 1));

  return {
    // region,
    province: province[1],
    birthday,
    gender,
    origin
  };
}

export default parseIdCard;
