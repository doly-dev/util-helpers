import { findTreeSelect, transformFieldNames } from '../../src';

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

describe('findTreeSelect', () => {
  it.only('basic', () => {
    const basicMenus = [{ "id": "1", "name": "首页", "code": "trade", "pid": null }, { "id": "2", "name": "交易管理", "code": "trade", "pid": null, "children": [{ "id": "3", "name": "交易查询", "code": "trade-1", "pid": "2", "children": [{ "id": "4", "name": "交易查询-查询操作", "code": "trade-1-1", "pid": "3" }] }] }, { "id": "5", "name": "权限管理", "code": "authorization", "pid": null, "children": [{ "id": "6", "name": "角色管理", "code": "authorization-1", "pid": "5" }, { "id": "7", "name": "用户管理", "code": "authorization-2", "pid": "5" }] }];

    console.log(JSON.stringify(findTreeSelect(basicMenus, item => item.id === '2')));
    console.log(JSON.stringify(findTreeSelect(basicMenus, item => item.id === '7')));
    expect(findTreeSelect(basicMenus, item => item.id === '2')).toMatchSnapshot();
    expect(findTreeSelect(basicMenus, item => item.id === '7')).toMatchSnapshot();
    expect(findTreeSelect(basicMenus, item => item.id === 'not found')).toMatchObject([]);
  });

  it('default', () => {
    const result1 = findTreeSelect(menus, item => item.id === '7');
    expect(result1.length).toBe(1);
    expect(result1[0]).toBe(menus[2]);

    const result2 = findTreeSelect(menus, item => item.id === '3');
    expect(result2.length).toBe(2);
    expect(result2[0]).toBe(menus[1]);
    expect(result2[1]).toBe(menus[1].children?.[0]);

    const result3 = findTreeSelect(menus, item => item.id === '15');
    expect(result3.length).toBe(3);
    expect(result3[0]).toBe(menus[2]);
    expect(result3[1]).toBe(menus[2].children?.[4]);
    expect(result3[2]).toBe(menus[2].children?.[4].children?.[2]);
  });

  it('custom children field name', () => {
    const menus2 = transformFieldNames(menus, { childs: 'children' }, 'children');
    const result1 = findTreeSelect(menus2, item => item.id === '7', 'childs');
    expect(result1.length).toBe(1);
    expect(result1[0]).toBe(menus2[2]);

    const result2 = findTreeSelect(menus2, item => item.id === '3', 'childs');
    expect(result2.length).toBe(2);
    expect(result2[0]).toBe(menus2[1]);
    expect(result2[1]).toBe(menus2[1].childs?.[0]);

    const result3 = findTreeSelect(menus2, item => item.id === '15', 'childs');
    expect(result3.length).toBe(3);
    expect(result3[0]).toBe(menus2[2]);
    expect(result3[1]).toBe(menus2[2].childs?.[4]);
    expect(result3[2]).toBe(menus2[2].childs?.[4].childs?.[2]);
  });
});
