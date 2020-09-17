// ----- 数据验证 start -----
type Validator = (value: string) => boolean;

export declare const isMobile: Validator;
export declare const isTelephone: Validator;
export declare const isPostcode: Validator;
export declare const isIdCard: Validator;
export declare const isEmail: Validator;
export declare const isQQ: Validator;
export declare const isWX: Validator;
export declare const isVehicle: Validator;
export declare const isBankCard: Validator;
export declare const isSocialCreditCode: Validator;
export declare const isPassword: (value: string, options?: { level?: number; ignoreCase?: boolean; special?: string; }) => boolean;
export declare const isPassport: Validator;
export declare const isChinese: (value: string, options?: { loose?: boolean }) => boolean;
export declare const isIPv4: Validator;
export declare const isIPv6: Validator;
export declare const isUrl: Validator;
export declare const isBusinessLicense: Validator;
// ----- 数据验证 end -----



// ----- 数据处理 start -----
type NumType = number | string;

export declare const formatMoney: (num: NumType, options?: {
  precision?: string | number;
  symbol?: string;
  thousand?: string;
  decimal?: string;
}) => string;

export declare const formatBankCard: (str: string, options?: {
  char?: string;
  length?: number;
}) => string;

export declare const replaceChar: (str: string, options?: {
  start?: number;
  end?: number;
  char?: string;
  repeat?: number;
  exclude?: string;
}) => string;

export declare const numberToChinese: (num: number, options?: {
  big5?: boolean;
  unit?: boolean;
  decomal?: string;
  zero?: string;
  negative?: string;
  unitConfig?: {
    w?: string;
    y?: string;
  };
}) => string;
// ----- 数据处理 end -----


// ----- 数学计算 start -----
type Math = (num1: number, num2: number, ...others: number[]) => number;

export declare const plus: Math;
export declare const minus: Math;
export declare const times: Math;
export declare const divide: Math;
export declare const round: (num: number, precision?: number) => number;
// ----- 数学计算 end -----