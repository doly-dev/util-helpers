import { filterTree, transformFieldNames } from '../../src';

const menus = [
  {
    id: '1',
    name: '首页',
    code: 'trade',
    pid: null
  },
  {
    id: '2',
    name: '交易管理',
    code: 'trade',
    pid: null,
    children: [
      {
        id: '3',
        name: '交易查询',
        code: 'trade-1',
        pid: '2',
        children: [
          {
            id: '4',
            name: '交易查询-查询操作',
            code: 'trade-1-1',
            pid: '3'
          },
          {
            id: '5',
            name: '交易查询-下载操作',
            code: 'trade-1-2',
            pid: '3'
          }
        ]
      },
      {
        id: '6',
        name: '新增交易',
        code: 'trade-2',
        pid: '2'
      }
    ]
  },
  {
    id: '7',
    name: '权限管理',
    code: 'authorization',
    pid: null,
    children: [
      {
        id: '8',
        name: '角色管理',
        code: 'authorization-1',
        pid: '7'
      },
      {
        id: '9',
        name: '角色管理-查询操作',
        code: 'authorization-1-1',
        pid: '7'
      },
      {
        id: '10',
        name: '角色管理-新增/修改操作',
        code: 'authorization-1-2',
        pid: '7'
      },
      {
        id: '11',
        name: '角色管理-删除操作',
        code: 'authorization-1-3',
        pid: '7'
      },
      {
        id: '12',
        name: '用户管理',
        code: 'authorization-2',
        pid: '7',
        children: [
          {
            id: '13',
            name: '用户管理-查询操作',
            code: 'authorization-2-1',
            pid: '12'
          },
          {
            id: '14',
            name: '用户管理-新增/修改操作',
            code: 'authorization-2-2',
            pid: '12'
          },
          {
            id: '15',
            name: '用户管理-删除操作',
            code: 'authorization-2-3',
            pid: '12'
          }
        ]
      }
    ]
  }
];

describe('filterTree', () => {
  it('basic', () => {
    const basicMenus = [
      { id: '1', name: '首页', code: 'trade', pid: null },
      { id: '2', name: '交易管理', code: 'trade', pid: null, children: [{ id: '3', name: '交易查询', code: 'trade-1', pid: '2', children: [{ id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' }] }] },
      {
        id: '5',
        name: '权限管理',
        code: 'authorization',
        pid: null,
        children: [
          { id: '6', name: '角色管理', code: 'authorization-1', pid: '5' },
          { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
        ]
      }
    ];

    // console.log(JSON.stringify(filterTree(basicMenus, item => item.name.indexOf('管理') > -1)));
    // console.log(JSON.stringify(filterTree(basicMenus, item => item.id === '7')));
    expect(filterTree(basicMenus, (item) => item.name.indexOf('管理') > -1)).toMatchObject([
      { id: '2', name: '交易管理', code: 'trade', pid: null, children: [] },
      {
        id: '5',
        name: '权限管理',
        code: 'authorization',
        pid: null,
        children: [
          { id: '6', name: '角色管理', code: 'authorization-1', pid: '5' },
          { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
        ]
      }
    ]);
    expect(filterTree(basicMenus, (item) => item.id === '7')).toMatchObject([]);
    expect(filterTree(basicMenus, (item) => item.id === 'not found')).toMatchObject([]);
  });

  it('incorrect', () => {
    const treeData = [{ a: 1, children: ['1'] }, 2];
    expect(filterTree(treeData, (item) => typeof item === 'object' && item.a === 2)).toMatchObject([]);
    expect(filterTree(treeData, (item) => item === 2)).toMatchObject([2]);

    // @ts-ignore
    expect(filterTree({}, (item) => item.id === '1')).toEqual([]);
    // @ts-ignore
    expect(filterTree(true, (item) => item.id === '1')).toEqual([]);
    // @ts-ignore
    expect(filterTree(undefined, (item) => item.id === '1')).toEqual([]);
    // @ts-ignore
    expect(filterTree(null, (item) => item.id === '1')).toEqual([]);
  });

  it('default', () => {
    expect(filterTree(menus, (item) => item.name.indexOf('管理') > -1)).toMatchSnapshot();
    expect(filterTree(menus, (item) => item.id === '1')).toMatchSnapshot();
    expect(filterTree(menus, (item) => item.name.indexOf('交易') > -1)).toMatchSnapshot();
    expect(filterTree(menus, (item) => !!item)).toMatchSnapshot();
  });

  it('custom children field name', () => {
    const menus2 = transformFieldNames(menus, { childs: 'children' }, 'children');
    expect(filterTree(menus2, (item) => item.name.indexOf('管理') > -1, 'childs')).toMatchSnapshot();
    expect(filterTree(menus2, (item) => item.id === '1', 'childs')).toMatchSnapshot();
    expect(filterTree(menus2, (item) => item.name.indexOf('交易') > -1, 'childs')).toMatchSnapshot();
    expect(filterTree(menus2, (item) => !!item, 'childs')).toMatchSnapshot();
  });

  it('node assign self', () => {
    const menus2 = transformFieldNames(menus, {}, 'children');
    const ret = filterTree(menus2, (item) => item.name.indexOf('管理') > -1, 'children', 'self');
    expect(ret[0]).toEqual(menus2[1]);
    expect(ret[0]).toMatchSnapshot();
    expect(ret[1]).toEqual(menus2[2]);
    expect(ret[1]).toMatchSnapshot();
    expect(menus2).toMatchSnapshot();
  });
});
