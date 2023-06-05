import { transformFieldNames, treeToList } from '../src';

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

describe('treeToList', () => {
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

    // console.log(JSON.stringify(treeToList(basicMenus, 'children')));
    expect(treeToList(basicMenus, 'children')).toMatchObject([
      { id: '1', name: '首页', code: 'trade', pid: null },
      { id: '2', name: '交易管理', code: 'trade', pid: null },
      { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
      { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
      { id: '5', name: '权限管理', code: 'authorization', pid: null },
      { id: '6', name: '角色管理', code: 'authorization-1', pid: '5' },
      { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
    ]);
  });

  it('incorrect', () => {
    const treeData = [{ a: 1, children: ['1'] }, { a: 2, children: [] }, '3'];
    // @ts-ignore
    expect(treeToList(treeData, 'children')).toMatchObject([{ a: 1 }, '1', { a: 2 }, '3']);
    // @ts-ignore
    expect(treeToList({}, 'children')).toMatchObject([]);
  });

  it('default', () => {
    const result = treeToList(menus, 'children');

    expect(result).toMatchObject([
      { id: '1', name: '首页', code: 'trade', pid: null },
      { id: '2', name: '交易管理', code: 'trade', pid: null },
      { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
      { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
      { id: '5', name: '交易查询-下载操作', code: 'trade-1-2', pid: '3' },
      { id: '6', name: '新增交易', code: 'trade-2', pid: '2' },
      { id: '7', name: '权限管理', code: 'authorization', pid: null },
      { id: '8', name: '角色管理', code: 'authorization-1', pid: '7' },
      { id: '9', name: '角色管理-查询操作', code: 'authorization-1-1', pid: '7' },
      { id: '10', name: '角色管理-新增/修改操作', code: 'authorization-1-2', pid: '7' },
      { id: '11', name: '角色管理-删除操作', code: 'authorization-1-3', pid: '7' },
      { id: '12', name: '用户管理', code: 'authorization-2', pid: '7' },
      { id: '13', name: '用户管理-查询操作', code: 'authorization-2-1', pid: '12' },
      { id: '14', name: '用户管理-新增/修改操作', code: 'authorization-2-2', pid: '12' },
      { id: '15', name: '用户管理-删除操作', code: 'authorization-2-3', pid: '12' }
    ]);
  });

  it('different key', () => {
    const newMenus = transformFieldNames(menus, { childs: 'children' }, 'children');
    const result = treeToList(newMenus, 'childs');

    expect(result).toMatchObject([
      { id: '1', name: '首页', code: 'trade', pid: null },
      { id: '2', name: '交易管理', code: 'trade', pid: null },
      { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
      { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
      { id: '5', name: '交易查询-下载操作', code: 'trade-1-2', pid: '3' },
      { id: '6', name: '新增交易', code: 'trade-2', pid: '2' },
      { id: '7', name: '权限管理', code: 'authorization', pid: null },
      { id: '8', name: '角色管理', code: 'authorization-1', pid: '7' },
      { id: '9', name: '角色管理-查询操作', code: 'authorization-1-1', pid: '7' },
      { id: '10', name: '角色管理-新增/修改操作', code: 'authorization-1-2', pid: '7' },
      { id: '11', name: '角色管理-删除操作', code: 'authorization-1-3', pid: '7' },
      { id: '12', name: '用户管理', code: 'authorization-2', pid: '7' },
      { id: '13', name: '用户管理-查询操作', code: 'authorization-2-1', pid: '12' },
      { id: '14', name: '用户管理-新增/修改操作', code: 'authorization-2-2', pid: '12' },
      { id: '15', name: '用户管理-删除操作', code: 'authorization-2-3', pid: '12' }
    ]);
  });
});
