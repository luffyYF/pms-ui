
const data = [
    {
      "id": 7001,
      "label": "其它功能",
      "children": [
        {
          "id": 700101,
          "label": "结账",
          "isLeaf": true
        },
        {
          "id": 700102,
          "label": "修改房态",
          "isLeaf": true
        },
        {
          "id": 700103,
          "label": "修改房价",
          "isLeaf": true
        }
      ]
    },
    {
      "id": 7002,
      "label": "导航功能",
      "children": [
        {
          "id": 700201,
          "label": "办理入住",
          "isLeaf": true
        },
        {
          "id": 700202,
          "label": "预订",
          "isLeaf": true
        },
        {
          "id": 700203,
          "label": "查看报表",
          "isLeaf": true
        },
        {
          "id": 700204,
          "label": "月收入情况查看",
          "isLeaf": true
        },
        {
          "id": 700205,
          "label": "订单管理",
          "isLeaf": true
        },
        {
          "id": 700206,
          "label": "消费部门",
          "isLeaf": true
        }
      ]
    }
  ]

export default {
  getMobilePower: config => {
      return {code:1, data:data, msg:null}
  }
}
