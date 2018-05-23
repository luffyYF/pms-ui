const data = [
    {
        "id": 6001,
        "label": "新订单通知",
        "isLeaf": true
    },
    {
        "id": 6002,
        "label": "前台操作授权",
        "isLeaf": true
    },
    {
        "id": 6003,
        "label": "每日经营报表",
        "isLeaf": true
    }
]

export default {
    getWechatManagerPower: config => {
        return {code:1, data:data, msg:null}
    }
}