import { transformFieldNames } from '../../src';

const options = [
  {
    code: '1',
    name: 'one',
  },
  {
    code: '2',
    name: 'two',
  }
];

const options2 = [
  {
    code: '1',
    name: 'one',
  },
  {
    code: '2',
    name: 'two',
  },
  {
    code: '3',
    name: 'three',
    children: [
      {
        code: '3-1',
        name: 'three-one',
        children: [
          {
            code: '3-1-1',
            name: 'three-one-one'
          },
          {
            code: '3-1-2',
            // name: 'three-one-two'
          },
        ]
      }
    ]
  }
];

const options3 = [
  {
    code: '1',
    name: 'one',
  },
  {
    code: '2',
    name: 'two',
  },
  {
    code: '3',
    name: 'three',
    bigN: 1n,
    nan: NaN,
    func: function () { },
    arrowFunc: () => { },
    max: Infinity,
    min: -Infinity,
    date: new Date(),
    undef: undefined,
    symbol: Symbol(),
    // [Symbol()]: 'symbol',
    // [Symbol.for('a')]: 'symbol for',
    childs: [
      {
        code: '3-1',
        name: 'three-one'
      },
      {
        code: '3-2',
        name: 'three-two',
        childs: [
          {
            code: '3-2-1',
            name: 'three-two-one'
          },
          {
            code: '3-2-2',
            name: 'three-two-two'
          },
        ]
      },
    ]
  }
]

describe('transformFieldNames', () => {
  it('return new object', () => {
    const newOpts = transformFieldNames(options, {
      label: 'name',
      value: 'code'
    });

    expect(options).toMatchObject([{ code: '1', name: 'one' }, { code: '2', name: 'two' }]);
    expect(newOpts).toMatchObject([{ label: 'one', value: '1' }, { label: 'two', value: '2' }]);
    expect(options).not.toEqual(newOpts);
  });

  it('assign fields', () => {
    const newOpts = transformFieldNames(options, { label: 'name' });
    expect(newOpts).toMatchObject([{ label: 'one', code: '1' }, { label: 'two', code: '2' }]);
  });

  it('recusion', () => {
    const newOpts = transformFieldNames(options2, { label: 'name', value: 'code' }, 'children');
    expect(newOpts).toMatchObject([{ label: 'one', value: '1' }, { label: 'two', value: '2' }, {
      value: '3',
      label: 'three',
      children: [
        {
          value: '3-1',
          label: 'three-one',
          children: [
            {
              value: '3-1-1',
              label: 'three-one-one'
            },
            {
              value: '3-1-2',
              // label: 'three-one-two'
            },
          ]
        }
      ]
    }]);
  });

  it('complex data and custom children field name.', () => {
    const newOpts = transformFieldNames(options3, { label: 'name', children: 'childs' }, 'childs');
    expect(newOpts).toMatchObject([{ label: 'one', code: '1' }, { label: 'two', code: '2' }, {
      code: '3',
      label: 'three',
      bigN: 1n,
      nan: NaN,
      func: options3[2].func,
      arrowFunc: options3[2].arrowFunc,
      max: Infinity,
      min: -Infinity,
      date: options3[2].date,
      undef: undefined,
      symbol: options3[2].symbol,
      // [Symbol()]: 'symbol',
      // [Symbol.for('a')]: 'symbol for',
      children: [
        {
          code: '3-1',
          label: 'three-one'
        },
        {
          code: '3-2',
          label: 'three-two',
          children: [
            {
              code: '3-2-1',
              label: 'three-two-one'
            },
            {
              code: '3-2-2',
              label: 'three-two-two'
            },
          ]
        },
      ]
    }])
  });

});