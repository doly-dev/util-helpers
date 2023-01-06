import { listToTree, transformFieldNames } from '../../src';

const menus = [
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
  { id: '15', name: '用户管理-删除操作', code: 'authorization-2-3', pid: '12' },
];

describe('listToTree', () => {
  it('basic', () => {
    const basicMenus = [
      { id: '1', name: '首页', code: 'trade', pid: null },
      { id: '2', name: '交易管理', code: 'trade', pid: null },
      { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
      { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
      { id: '5', name: '权限管理', code: 'authorization', pid: null },
      { id: '6', name: '角色管理', code: 'authorization-1', pid: '5' },
      { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
    ];
    // console.log(JSON.stringify(listToTree(basicMenus)));
    expect(listToTree(basicMenus)).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }]);

    // console.log(JSON.stringify(listToTree(basicMenus, { childrenField: 'childs' })));
    expect(listToTree(basicMenus, { childrenField: 'childs' })).toMatchObject([{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "childs": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "childs": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "childs": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }]);
  });

  it('incorrect', () => {
    const listData = [{ id: 2, pid: 1 }, { id: 1 }, 3];
    // @ts-ignore
    expect(listToTree(listData)).toMatchObject([{ id: 1, children: [{ id: 2, pid: 1 }] }]);

    // @ts-ignore
    expect(listToTree(true)).toMatchObject([]);
  });

  it('default', () => {
    // console.log(JSON.stringify(listToTree(menus)));
    expect(listToTree(menus)).toMatchSnapshot();
  });

  it('different empty children value', () => {
    expect(listToTree(menus, { emptyChildrenValue: 'array' })).toMatchSnapshot();
    expect(listToTree(menus, { emptyChildrenValue: 'null' })).toMatchSnapshot();
    expect(listToTree(menus, { emptyChildrenValue: 'none' })).toMatchSnapshot();
  });

  it('custom field name', () => {
    expect(listToTree(menus, { childrenField: 'childs' })).toMatchSnapshot();

    const menus2 = transformFieldNames(menus, { currentId: 'id', parentId: 'pid' });
    expect(listToTree(menus2, { keyField: 'currentId', parentField: 'parentId', childrenField: 'childs' })).toMatchSnapshot();
  });

  it('nodeAssign', () => {
    const basicMenus = [
      { id: '1', name: '首页', code: 'trade', pid: null },
      { id: '2', name: '交易管理', code: 'trade', pid: null },
      { id: '3', name: '交易查询', code: 'trade-1', pid: '2' },
      { id: '4', name: '交易查询-查询操作', code: 'trade-1-1', pid: '3' },
      { id: '5', name: '权限管理', code: 'authorization', pid: null },
      { id: '6', name: '角色管理', code: 'authorization-1', pid: '5' },
      { id: '7', name: '用户管理', code: 'authorization-2', pid: '5' }
    ];

    const result = listToTree(basicMenus, { childrenField: 'childs', nodeAssign: 'self' });

    expect(result[0]).toEqual(basicMenus[0]);
    expect(result[1]).toEqual(basicMenus[1]);
    expect(result[1].childs[0]).toEqual(basicMenus[2]);
    expect(result[1].childs[0].childs[0]).toEqual(basicMenus[3]);
    expect(result[2]).toEqual(basicMenus[4]);
    expect(result[2].childs[0]).toEqual(basicMenus[5]);
    expect(result[2].childs[1]).toEqual(basicMenus[6]);
  });
});