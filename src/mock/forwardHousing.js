const RoomsData = {
    columnDate:[{
        dateKey:'2018-02-09',
        dateLabel:'02月09日周一'
    },{
        dateKey:'2018-02-10',
        dateLabel:'02月10日周二'
    },{
        dateKey:'2018-02-11',
        dateLabel:'02月11日周三'
    },{
        dateKey:'2018-02-12',
        dateLabel:'02月12日周四'
    }],
    rowRooms:[{
        houseTypePk:'pk1',
        houseType: "浪漫公寓",
        room1: "22/50",
        room2: "33/40",
        room3: "11/28",
        room4: "6/50",
      },{
        houseTypePk:'pk2',
        houseType: "爱情公寓",
        room1: "22/52",
        room2: "33/55",
        room3: "44/56",
        room4: "6/59",
    }]
}

export default {
    getRoomsData: config => {
        return {code:1, data:RoomsData, msg:null}
    }
}