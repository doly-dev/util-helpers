import { findTreeNode, transformFieldNames } from '../../src';

const menus = [
  {
    "id": "1",
    "name": "首页",
    "code": "trade",
    "pid": null
  },
  {
    "id": "2",
    "name": "交易管理",
    "code": "trade",
    "pid": null,
    "children": [
      {
        "id": "3",
        "name": "交易查询",
        "code": "trade-1",
        "pid": "2",
        "children": [
          {
            "id": "4",
            "name": "交易查询-查询操作",
            "code": "trade-1-1",
            "pid": "3"
          },
          {
            "id": "5",
            "name": "交易查询-下载操作",
            "code": "trade-1-2",
            "pid": "3"
          }
        ]
      },
      {
        "id": "6",
        "name": "新增交易",
        "code": "trade-2",
        "pid": "2"
      }
    ]
  },
  {
    "id": "7",
    "name": "权限管理",
    "code": "authorization",
    "pid": null,
    "children": [
      {
        "id": "8",
        "name": "角色管理",
        "code": "authorization-1",
        "pid": "7"
      },
      {
        "id": "9",
        "name": "角色管理-查询操作",
        "code": "authorization-1-1",
        "pid": "7"
      },
      {
        "id": "10",
        "name": "角色管理-新增/修改操作",
        "code": "authorization-1-2",
        "pid": "7"
      },
      {
        "id": "11",
        "name": "角色管理-删除操作",
        "code": "authorization-1-3",
        "pid": "7"
      },
      {
        "id": "12",
        "name": "用户管理",
        "code": "authorization-2",
        "pid": "7",
        "children": [
          {
            "id": "13",
            "name": "用户管理-查询操作",
            "code": "authorization-2-1",
            "pid": "12"
          },
          {
            "id": "14",
            "name": "用户管理-新增/修改操作",
            "code": "authorization-2-2",
            "pid": "12"
          },
          {
            "id": "15",
            "name": "用户管理-删除操作",
            "code": "authorization-2-3",
            "pid": "12"
          }
        ]
      }
    ]
  }
];

describe('findTreeNode', () => {
  it('basic', () => {
    const basicMenus = [{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }];

    // console.log(JSON.stringify(findTreeNode(basicMenus, item => item.id === '2')));
    // console.log(JSON.stringify(findTreeNode(basicMenus, item => item.id === '7')));
    expect(findTreeNode(basicMenus, item => item.id === '2')).toBe(basicMenus[1]);
    expect(findTreeNode(basicMenus, item => item.id === '7')).toBe(basicMenus[2].children?.[1]);
    expect(findTreeNode(basicMenus, item => item.id === 'not found')).toBeUndefined();
  })

  it('default', () => {
    expect(findTreeNode(menus, ietm => ietm.id === '1000')).toBeUndefined();
    expect(findTreeNode(menus, item => item.id === '1')).toBe(menus[0]);
    expect(findTreeNode(menus, item => item.id === '2')).toBe(menus[1]);
    expect(findTreeNode(menus, item => item.id === '13')).toBe(menus[2]!.children![4].children![0]);
  });

  it('custom children field name', () => {
    const menus2 = transformFieldNames(menus, { childs: 'children' }, 'children');
    expect(findTreeNode(menus2, item => item.id === '1', 'childs')).toBe(menus2[0]);
    expect(findTreeNode(menus2, item => item.id === '13', 'childs')).toBe(menus2[2]!.childs![4].childs![0]);
  });
});
