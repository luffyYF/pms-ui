  //通讯
  import bus from '@/utils/bus'
  //全局变量
  import {paymentMap, billStatusMap} from '@/utils/orm'
  // 权限
  import {powerJudge} from '@/utils/permissionsOperation.js'
  // 组件
  import dialogBorrow from '@/pages/reserveManage/addReserve/dialogBorrow'
  import commentPrint from '@/components/PrintPage/commonPrintPage'
  import billSettlement from './bill/billSettlement'
  // API
  import {findOrder} from '@/api/order/pmsOrderController'
  import {gmCount} from "@/api/goods/goodsManageController";
  import { listByProjectType } from '@/api/systemSet/pmsProjectController'
  import {addBill,authBill,listBill,offsetBill,partialCheckoutBill,singleRoomCheckoutBill,splitBill,transBill,selectGuestOrderBill,countCheckoutBill} from '@/api/bill'
  
    export default {
      props:['dumbObj'],
      components:{dialogBorrow, commentPrint, billSettlement},
      data() {
        return {
          currOrderInfo:{
            order:{},
            guestList:[]
          },
          paymentMap: paymentMap,
          billStatusMap: billStatusMap,
          // 房态账单 start
          orderPk: '',
          guestOrderSelect: [],
          guestList: [],
          formAddBill: {
            projectPk:'',
            guestOrderPk: null,  
            channelTypePk: null,
            projectName: '',  
            consumptionAmount: '',
            remark: '',
            payment: '0',
          },
          multipleSelection: [],
          splitForm: {
            billPk: '',
            consumptionAmount: '',
            price: '',
            remark: ''
          },
          serachForm: {
            state: 'UN_SET', 
            roomPk: '', 
            guestOrderPk: '', 
            currentData: null
          }, 
          // 房态账单  end
          dumbHouseObj:{},
          roomProjectList:[],
          conProjectList:[],
          billsList:[],
          form: {
            checkType: '',
            channel: '',
            name: '',
            region: ''
          },
          dialogTollAllocation: false,
          dialogOffset: false,
          dialogTransferAccounts: false,
          dialogAccountedFor: false,
          dialogBatchEntry: false,
          dialogPreLicensing: false,
          projectSelectionAssistant: false,
          dialogVirtualBill: false,
          itemSelector: false,
          dialogCheckout: false,
          dialogSingleRoom: false,
          dialogPartialCheckout: false,
          dialogDepositPrint: false,
          depositPrint: false,
          dialogExchange: false,
          dialogBankCard: false,
          dialogStoredCard: false,
          dialogWeChatPayment: false,
          tableData: [{
            name: '',
          }],
          tableData1: [],
          activeName2: 'first',
          seeLicensing: true,
          editLicensing: false,
          datepicker: [],
        }
        
      },
      created(){
        this.dumbHouseObj = this.dumbObj;
        // this.initProject();
        // this.lookupBillList();
      },
      methods: {
        lookupBillList(orderPk) {
          this.orderPk = orderPk
          this.listBill()
          this.initAddBill()
          this.initProject()
          this.initSearchForm()
          this.initGuestSelect(orderPk)
          this.findOrderInfo(orderPk)
        },
        findOrderInfo(orderPk){
          findOrder({orderPk: orderPk}).then(res=>{
            this.currOrderInfo = res.data 
          })
        },
        listBill() {//查找账单列表
          let data = {
            orderPk: this.orderPk,
            billStatus: this.serachForm.state,
            businessDate: this.serachForm.currentData,
            roomPk: this.serachForm.roomPk,
            guestOrderPk: this.serachForm.guestOrderPk
          }
          listBill(data).then(res => {
            this.billsList = res.data;
            this.billsList.forEach((bill, index) => {
              bill.consumptionAmount = Math.round(bill.consumptionAmount*100)/100;
              bill.settlementAmount = Math.round(bill.settlementAmount*100)/100;
              console.log(bill.settlementAmount)
            });
          })
        },
        initGuestSelect(orderPk) {//查找客单下拉框列表
          selectGuestOrderBill({orderPk: orderPk}).then(res=>{ 
            this.guestOrderSelect = res.data
          })
        },
        initSearchForm() {
          this.serachForm.state = 'UN_SET'
          this.serachForm.roomPk = ''
          this.serachForm.guestOrderPk = ''
          this.serachForm.currentData = null
        },
        initAddBill() {
          this.formAddBill.projectPk=null
          this.formAddBill.projectName=null 
          this.formAddBill.guestOrderPk=null
          this.formAddBill.channelTypePk=null
          this.formAddBill.consumptionAmount=null
          this.formAddBill.remark=null
          this.formAddBill.payment = '0'
        },
        openAddBill(p) {//打开添加入账
          this.initAddBill()
          this.formAddBill.projectPk = p.projectPk
          this.formAddBill.projectName = p.projectName
          this.formAddBill.guestOrderPk = this.guestOrderSelect[0].guestOrderPk
          this.dialogAccountedFor = true
        },
        //暂时注释哑房账回调 调用的文件DumbHouse.vue -> showDumbDetail()
        // dumBill(dumbPk){
        //   this.dumbPk = dumbPk
        //   listBill({dumbPk: dumbPk}).then(res => {
        //     this.billsList = res.data
        //   });
        //   countCheckoutBill({dumbPk: dumbPk}).then(res => {
        //     this.countCheckoutDate = res.data
        //   });
        // },
        addBillList(formAddBill){ //入账
          if(!formAddBill.projectPk){
            this.$message({type:'warning', message:'请选择项目'})
            return
          }
          if(!formAddBill.guestOrderPk){
            this.$message({type:'warning', message:'请选择客单'})
            return
          }
          if(!formAddBill.payment){
            this.$message({type:'warning', message:'请选择支付方式'})
            return
          }
          if(formAddBill.payment=='5'){//是选择AR帐
            if(!formAddBill.channelTypePk){
              this.$message({type:'warning', message:'请选择渠道类型'})
              return
            }
          }
          if(!formAddBill.consumptionAmount){
            this.$message({type:'warning', message:'请输入消费金额'})
            return
          }
          if(Number(formAddBill.consumptionAmount)<=0){
            this.$message({type:'warning', message:'请输入消费金额'})
            return
          }
          var formAddBillList = {
            consumptionAmount: formAddBill.consumptionAmount,
            guestOrderPk: formAddBill.guestOrderPk,
            orderPk: this.orderPk,
            projectName: formAddBill.projectName,
            projectPk: formAddBill.projectPk,
            channelTypePk: formAddBill.channelTypePk,
            payment: formAddBill.payment,
            remark: formAddBill.remark,
            billType: 'ROOM',

          }
          addBill(formAddBillList).then(res => {
            if(res.code == 1){
              this.$message({
                message: '入账成功！',
                type: 'success'
              });
            }
            this.dialogAccountedFor = false;
            this.lookupBillList(this.orderPk);
          })
        },
        filterRoom(guestOrderSelect) {
          var temp = []
          guestOrderSelect.forEach(guest => {
            if(guest.roomPk){
              let flag = true
              temp.forEach(t=>{
                if(t.roomPk==guest.roomPk){
                  flag = false
                }
              })
              if(flag){
                temp.push(guest)
              }
            }
          })
          return temp
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        splitBillOperation(){ //选择判断
          const tickOptions = this.multipleSelection.length;
          const tickOptionsList = this.multipleSelection;
          if(tickOptions == 1){
            this.dialogTollAllocation = true;
            for (let index = 0; index < tickOptionsList.length; index++) {
              this.splitForm.billPk = tickOptionsList[0].billPk;
              this.splitForm.consumptionAmount = tickOptionsList[0].consumptionAmount;
            }
          }else if(tickOptions == 0){
            this.$message({
              message: '没有项目被选中，请选择您要拆分的项目！',
              type: 'warning'
            });
          }else{
            this.$message({
              message: '仅能对一个项目进行拆分，请重新选择！',
              type: 'warning'
            });
          }
        },
        confirmSplit(fromList){//拆账
          splitBill({billPk: fromList.billPk, price:fromList.price, remark: fromList.remark}).then(res => {
            if(res.code == 1){
              this.$message({
                message: '拆账成功！',
                type: 'success'
              });
              this.dialogTollAllocation = false;
              this.listBill()
            }
          })
        },
        offsetBillOperation(){ //选择判断
          const tickOptions = this.multipleSelection.length;
          const tickOptionsList = this.multipleSelection;
          if(tickOptions == 1){
            this.dialogOffset = true;
            for (let index = 0; index < tickOptionsList.length; index++) {
              this.splitForm.billPk = tickOptionsList[0].billPk;
              this.splitForm.consumptionAmount = tickOptionsList[0].consumptionAmount;
            }
          }else if(tickOptions == 0){
            this.$message({
              message: '没有项目被选中，请选择您要拆分的项目！',
              type: 'warning'
            });
          }else{
            this.$message({
              message: '仅能对一个项目进行拆分，请重新选择！',
              type: 'warning'
            });
          }
        },
        confirmOffset(fromList){ //冲减
          offsetBill({billPk: fromList.billPk, price:fromList.price, remark: fromList.remark}).then(res => {
            if(res.code == 1){
              this.$message({
                message: '拆账成功！',
                type: 'success'
              });
              this.dialogOffset = false;
              this.listBill()
            }
          })
        },
        clickPrint() {//打印账单
          if(this.multipleSelection.length<=0){
            this.$message({type:'warning',message:'至少选择一条账单'})
            return;
          }
          let beginDate = this.currOrderInfo.guestList[0].beginDate
          let endDate = this.currOrderInfo.guestList[0].endDate
          this.$refs.commentPrintRef.printBill(this.multipleSelection, beginDate, endDate)
        },
        initProject(){
          //SETTLEMENT,CONSUMER
          listByProjectType({projectType:'CONSUMER'}).then(res => {
            this.conProjectList = res.data
          })
          listByProjectType({projectType:'SETTLEMENT'}).then(res => {
            this.roomProjectList = res.data
          })
          // var datas={
          //   orderPk:null,
          //   dumbPk:this.dumbHouseObj.dumbPk
          // };
          // listBill(datas).then(res => {
          //   this.billsList = res.data;
          // })
        },
        settlement(type){
          gmCount({ orderPk: this.orderPk }).then(res => {
            let wjCount = res.data.wjCount;
            if (Number(wjCount) > 0) {
              this.$confirm("有" + wjCount + "个物品外借未归还，请先归还或赔偿")
                .then(_ => {
                  this.$refs.dialogBorrowRef.init(this.orderPk, "NORETURN"); //打开物品外借
                })
                .catch(_ => {});
            } else {
              if(type==1){//退房未结
                if(this.currOrderInfo.order.hfFlag=='Y'){
                  this.$refs.billSettlementRef.init(this.orderPk, 3, '',this.currOrderInfo.order.hfCashPledge)
                }else{
                  this.$refs.billSettlementRef.init(this.orderPk, 1)
                }
              }else if(type==2){//部分结账
                let select = this.multipleSelection;
                let pks = []
                if(this.serachForm.state!='UN_SET'){
                  this.$message({type:'warning', message:'请选择未结账的账单'})
                  return;
                }
                if(select.length<=0){
                  this.$message({type:'warning', message:'请至少选择一条未结账的账单'})
                  return;
                }
                select.forEach(row=>{
                  pks.push(row.billPk)
                })
                this.$refs.billSettlementRef.init(this.orderPk, 2,pks.toString())
              }else if(type==0){//结账
                this.$refs.billSettlementRef.init(this.orderPk, 0)
              }
            }
          });
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        addAuthorization(){
          this.seeLicensing = false;
          this.editLicensing =  true;
        },
        seeAuthorization(){
          this.seeLicensing = true;
          this.editLicensing =  false;
        },
        onSubmit() {
          // console.log('submit!');
        },
        powerJudge(id){
          return powerJudge(id);
        },
        ifRoomNumber(roomNumber){
          if(roomNumber==null || roomNumber==undefined || roomNumber=='')
            return '未安排'
          else
            return roomNumber
        }
        
      },
      mounted() {
        bus.$on('billload', () => { this.listBill() })
      }
    }