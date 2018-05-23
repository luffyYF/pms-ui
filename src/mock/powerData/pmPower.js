const data = [
    {
        "id": 1001,
        "label": "修改房价",
        "isLeaf": true
    },
    {
        "id": 1002,
        "label": "冲减",
        "isLeaf": true
    },
    {
        "id": 1003,
        "label": "手工调整积分",
        "isLeaf": true
    },
    {
        "id": 1004,
        "label": "退押金",
        "isLeaf": true
    },
    {
        "id": 1005,
        "label": "房退不结结账",
        "isLeaf": true
    },
    {
        "id": 1006,
        "label": "恢复账单",
        "isLeaf": true
    },
    {
        "id": 1007,
        "label": "换房",
        "isLeaf": true
    },
    {
        "id": 1008,
        "label": "取消收取日租房费授权",
        "isLeaf": true
    },
    {
        "id": 1009,
        "label": "拆分账单",
        "isLeaf": true
    },
    {
        "id": 1010,
        "label": "取消收取钟点房费",
        "isLeaf": true
    },
    {
        "id": 1011,
        "label": "取消收取特殊房费",
        "isLeaf": true
    },
    {
        "id": 1012,
        "label": "报表EXCEL导出",
        "isLeaf": true
    },
    {
        "id": 1013,
        "label": "报表PDF预览",
        "isLeaf": true
    },
    {
        "id": 1014,
        "label": "取消入住",
        "isLeaf": true
    },
    {
        "id": 1015,
        "label": "手工升级",
        "isLeaf": true
    },
    {
        "id": 1016,
        "label": "退房恢复",
        "isLeaf": true
    },
    {
        "id": 1017,
        "label": "扫描身份证",
        "isLeaf": true
    },
    {
        "id": 1018,
        "label": "读会员卡",
        "isLeaf": true
    },
    {
        "id": 1019,
        "label": "门锁",
        "isLeaf": true
    },
    {
        "id": 1020,
        "label": "打印",
        "isLeaf": true
    },
    {
        "id": 1021,
        "label": "正常房转钟点房",
        "isLeaf": true
    },
    {
        "id": 1022,
        "label": "营业收入上缴",
        "isLeaf": true
    },
    {
        "id": 1023,
        "label": "房费调整",
        "isLeaf": true
    },
    {
        "id": 1024,
        "label": "会员卡赠送",
        "isLeaf": true
    },
    {
        "id": 1025,
        "label": "微信支付宝冲减退款",
        "isLeaf": true
    }
]

export default {
    getPmPower: config => {
        return {code:1, data:data, msg:null}
    }
}
