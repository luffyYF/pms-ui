

const teamMap = [{
    groupOrders: 'MHF5501',
    teamName: '超能集团',
    numberOfOccupancy: '5',
    roomNumber: '506,620,623,5521,963',
    virtualTicketNumber: '78596492',
    checkInTime: '2018-02-03',
    checkOutTime: '2018-02-06',
    groupPayTheAmount: '9000',
    aPaymentAmount: '800',
    amountOfConsumption: '1000',
    settlementAmount: '5000',
    remarks: '',
}]

export default {
  getTeamMap: config => {
    return {code: 1, data: teamMap, msg: null}
  }
}
