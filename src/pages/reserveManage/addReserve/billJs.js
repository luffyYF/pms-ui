  //通讯
  import bus from '@/utils/bus'
  //全局变量
  import {paymentMap, billStatusMap} from '@/utils/orm'
  // 权限
  // import {powerJudge} from '@/utils/permissionsOperation.js'
  // 组件
  import dialogBorrow from '@/pages/reserveManage/addReserve/dialogBorrow'
  import commentPrint from '@/components/PrintPage/commonPrintPage'
  import billSettlement from './bill/billSettlement'
  import dialogRecoverBill from './bill/dialogRecoverBill'
  import dialogTimeoutRemind from './bill/dialogTimeoutRemind'
  import dialogBatchAddBill from './bill/dialogBatchAddBill'
  //转账组单选择
  import transferAccounts from './transferAccounts'
  // API
  import {findOrder} from '@/api/order/pmsOrderController'
  import {getDumbByPk} from '@/api/conferenceRoom/mtgRoomController'
  import {gmCount} from "@/api/goods/goodsManageController"
  import { listByProjectType } from '@/api/systemSet/pmsProjectController'

  import {
    addBill,
    // addBills,
    transferAccountsBill,
    addDumbBill,
    addDumbBills,
    authBill,
    listBill,
    offsetBill,
    partialCheckoutBill,
    singleRoomCheckoutBill,
    splitBill,
    transBill,
    selectGuestOrderBill,
    countCheckoutBill,
    overtimeRemind
  } from '@/api/bill'
  import {addVirtual} from '@/api/pmsVirtualBill/pmsVirtualBill'
  import Moment from 'moment'
    export default {
      props:['dumbObj'],
      components:{
        dialogBorrow,
        commentPrint,
        billSettlement,
        dialogRecoverBill,
        dialogTimeoutRemind,
        dialogBatchAddBill,
        transferAccounts
      },
      data() {
        return {
          //当前订单信息
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
          // formAddBills:[{
          //   projectPk:'',
          //   guestOrderPk: null,
          //   channelTypePk: null,
          //   projectName: '',
          //   consumptionAmount: '',
          //   remark: '',
          //   payment: '0',
          // }],
          multipleSelection: [],
          // addBillMultipleSelection:[],
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
          virDialog:false,
          tableData: [{
            name: '',
          }],
          tableData1: [],
          activeName2: 'first',
          summary:'first',
          seeLicensing: true,
          editLicensing: false,
          datepicker: [],
          virtualBill:{},
          virtualBillDatailList:[],
          virGuestList:[],
          allProjectList:[],
          projectSelectDialog:false,
          currentVirIndex:0,
          consumptionAmount:0,
          settlementAmount:0,
          projectTypeList:[
            {label:"所有消费类别",value:"ALL"},
            {label:"餐券",value:"CJ"},
            {label:"赔偿",value:"PC"},
            {label:"房费",value:"FF"},
            {label:"系统",value:"SYS"},
            {label:"消费品",value:"XFP"},
            {label:"客房赔偿",value:"ROOM_PC"},
            {label:"支付",value:"ZF"},
          ],
          virProjectType:"ALL",
          virPk:null,
          PRINT_ROOT:process.env.PRINT_ROOT,
          isDubm:false,
          dumbData:{
            checkoutFlag:"Y"
          },
          // addBillsConsumptionAmount:0,
          // addBillsSettlementAmount:0,
          tagetTransferAccounts:{

          }
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
          this.initSearchForm()
          this.listBill()
          this.initAddBill()
          this.initProject()
          this.initGuestSelect(orderPk)
          this.findOrderInfo(orderPk)
          // this.$nextTick(()=>{
          //   this.$refs.channelRef.load(false);
          // })
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
            guestOrderPk: this.serachForm.guestOrderPk,
            dumbPk:this.dumbPk
          }
          listBill(data).then(res => {
            this.billsList = res.data;
            if(this.billsList){
              this.billsList.forEach((bill, index) => {
                bill.consumptionAmount = Math.round(bill.consumptionAmount*100)/100;
                bill.settlementAmount = Math.round(bill.settlementAmount*100)/100;
              });
            }
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
          if(!this.isDubm){
            let arr = this.getAddBillFilter(this.guestOrderSelect);
            if(arr!=null && arr.length>0) {
              this.formAddBill.guestOrderPk = arr[0].guestOrderPk;
            }
            // this.formAddBill.guestOrderPk = this.guestOrderSelect[0].guestOrderPk
          }else{
            this.formAddBill.dumbPk = this.dumbPk
          }
          // this.formAddBill.guestOrderPk = this.guestOrderSelect[0].guestOrderPk
          this.dialogAccountedFor = true
        },
        //暂时注释哑房账回调 调用的文件DumbHouse.vue -> showDumbDetail()
        dumBill(dumbPk){
          this.dumbPk = dumbPk
          this.isDubm = true
          listBill({dumbPk: dumbPk}).then(res => {
            this.billsList = res.data
          });
          countCheckoutBill({dumbPk: dumbPk}).then(res => {
            this.countCheckoutDate = res.data
          });
          getDumbByPk({dumbPk: dumbPk}).then(res => {
            this.dumbData= res.data
          });
        },
        addBillList(formAddBill){ //入账
          if(!formAddBill.projectPk){
            this.$message({type:'warning', message:'请选择项目'})
            return
          }
          if(!formAddBill.guestOrderPk && !this.isDubm){
            this.$message({type:'warning', message:'请选择客单'})
            return
          }
          if(!formAddBill.payment){
            this.$message({type:'warning', message:'请选择支付方式'})
            return
          }
          // if(formAddBill.payment=='5'){//是选择AR帐
          //   if(!formAddBill.channelTypePk){
          //     this.$message({type:'warning', message:'请选择渠道类型'})
          //     return
          //   }
          // }
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
            dumbPk:this.dumbPk,
            billType: this.isDubm?'DUMB':'ROOM',
          }
          if(!this.isDubm){
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
          }else{
            addDumbBill(formAddBillList).then(res => {
              if(res.code == 1){
                this.$message({
                  message: '入账成功！',
                  type: 'success'
                });
              }
              this.listBill()
              this.dialogAccountedFor = false;
            })
          }
        },
        //批量入账计算金额
        // addBillMomeyChange(){
        //     var money = 0
        //     for(var i=0;i<this.formAddBills.length;i++){
        //       if(this.formAddBills[i].consumptionAmount){
        //         money = money + parseFloat(this.formAddBills[i].consumptionAmount)
        //       }
        //     }
        //     this.addBillsConsumptionAmount = money.toFixed(2)
        // },
        // addBillLists(formAddBills){
        //   for(var i=0;i<formAddBills.length;i++){
        //     if(!formAddBills[i].projectPk){
        //       this.$message({type:'warning', message:'请选择账单'+(i+1)+"的项目"})
        //       return
        //     }
        //     if(!formAddBills[i].guestOrderPk && !this.isDubm){
        //       this.$message({type:'warning', message:'请选择账单'+(i+1)+"的客单"})
        //       return
        //     }
        //     if(!formAddBills[i].payment){
        //       this.$message({type:'warning', message:'请选择账单'+(i+1)+"的支付方式"})
        //       return
        //     }
        //     if(!formAddBills[i].consumptionAmount){
        //       this.$message({type:'warning', message:'请输入账单'+(i+1)+"的消费金额"})
        //       return
        //     }
        //     if(Number(formAddBills[i].consumptionAmount)<=0){
        //       this.$message({type:'warning', message:'请输入正确的账单'+(i+1)+"的消费金额"})
        //       return
        //     }
        //     formAddBills[i].orderPk = this.orderPk
        //     formAddBills[i].dumbPk = this.dumbPk,
        //     formAddBills[i].billType =  this.isDubm?'DUMB':'ROOM'
        //   }
        //   if(!this.isDubm){
        //     addBills(formAddBills).then(res => {
        //       if(res.code == 1){
        //         this.$message({
        //           message: '入账成功！',
        //           type: 'success'
        //         });
        //       }
        //       this.dialogBatchEntry = false;
        //       this.lookupBillList(this.orderPk);
        //     })
        //   }else{
        //     addDumbBills(formAddBills).then(res => {
        //       if(res.code == 1){
        //         this.$message({
        //           message: '入账成功！',
        //           type: 'success'
        //         });
        //       }
        //       this.listBill()
        //       this.dialogBatchEntry = false;
        //     })
        //   }
        // },
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
        //批量入账
        // addBillHandleSelectionChange(val){
        //   this.addBillMultipleSelection = val
        // },
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
          let beginDate = this.currOrderInfo.guestList.length>0?this.currOrderInfo.guestList[0].beginDate:new Date()
          let endDate = this.currOrderInfo.guestList.length>0?this.currOrderInfo.guestList[0].endDate:new Date()
          this.$refs.commentPrintRef.printBill(this.multipleSelection, beginDate, endDate)
        },
        initProject(){
          //SETTLEMENT,CONSUMER
          this.allProjectList = []
          listByProjectType({projectType:'CONSUMER'}).then(res => {
            this.conProjectList = res.data
            // this.allProjectList = this.allProjectList.concat(this.conProjectList)
          })
          listByProjectType({projectType:'SETTLEMENT'}).then(res => {
            this.roomProjectList = res.data
            // this.allProjectList = this.allProjectList.concat(this.roomProjectList)
          })
          // var datas={
          //   orderPk:null,
          //   dumbPk:this.dumbHouseObj.dumbPk
          // };
          // listBill(datas).then(res => {
          //   this.billsList = res.data;
          // })
        },
        /**
         * 结账处理
         * @param {*} type 0结账 1退房未结 2部分结账
         */
        settlement(type){
          if(!this.isDubm){
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
                  this.$refs.billSettlementRef.init(this.orderPk, 1)
                }else if(type==2){//部分结账
                  let select = this.multipleSelection;
                  let pks = []
                  // if(this.serachForm.state!='UN_SET'){
                  //   this.$message({type:'warning', message:'请选择未结账的账单'})
                  //   return;
                  // }
                  if(select.length<=0){
                    this.$message({type:'warning', message:'请至少选择一条未结账的账单'})
                    return;
                  }
                  select.forEach(row=>{
                    pks.push(row.billPk)
                  })
                  this.$refs.billSettlementRef.init(this.orderPk, 2,pks.toString())
                }else if(type==0){
                  //结账+退房
                  this.$refs.dialogTimeoutRemindRef.showDialog(this.orderPk)
                  // this.$refs.billSettlementRef.init(this.orderPk, 0)
                }
              }
            });
          }else{
            if(type==1){
              //退房未结
              // if(this.currOrderInfo.order.hfFlag=='Y'){
              //   this.$refs.billSettlementRef.init(this.orderPk, 3, '',this.currOrderInfo.order.hfCashPledge)
              // }else{
              //   this.$refs.billSettlementRef.init(this.orderPk, 1)
              // }
              this.$refs.billSettlementRef.init(this.orderPk, 1,null,null,this.isDubm)
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
              this.$refs.billSettlementRef.init(this.orderPk, 2,pks.toString(),null,this.isDubm,null,this.dumbPk)

            }else if(type==0){
              let pks = []
              if(this.serachForm.state!='UN_SET'){
                this.$message({type:'warning', message:'请选择未结账的账单'})
                return;
              }
              this.billsList.forEach(row=>{
                pks.push(row.billPk)
              })
              this.$refs.billSettlementRef.init(this.orderPk, 2,pks.toString(),null,this.isDubm,'FINISH',this.dumbPk)
            }
          }
        },
        //打开结账页面
        toSettle() {
          this.$refs.billSettlementRef.init(this.orderPk, 0)
        },
        addBillToSettle() {
          this.listBill();
          this.$refs.billSettlementRef.init(this.orderPk, 0)
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
        ifRoomNumber(roomNumber){
          if(roomNumber==null || roomNumber==undefined || roomNumber=='')
            return '未排房'
          else
            return roomNumber
        },
        virtualBillClick() {
          this.$confirm('确认生成虚拟账单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // this.billsList
            var channelTypePk = ''
            var dumbPk = ''
            var billType = ''
            this.virtualBillDatailList = [];
            this.virGuestList = [];
            var userInfo = JSON.parse(localStorage.getItem("pms_userinfo"));
            for(var i = 0;i<this.billsList.length;i++){
              parseFloat(this.billsList[i].settlementAmount)
              this.virtualBillDatailList.push({
                guestOrderPk:this.billsList[i].guestOrderPk,
                billCode:this.billsList[i].billCode,
                dumbPk:this.billsList[i].dumbPk,
                memName:this.billsList[i].memName,
                projectPk:this.billsList[i].projectPk,
                projectCode:this.billsList[i].projectCode,
                projectName:this.billsList[i].projectName,
                goodsOrderPk:this.billsList[i].goodsOrderPk,
                billType:this.billsList[i].billType,
                consumptionAmount:this.billsList[i].consumptionAmount,
                settlementAmount:this.billsList[i].settlementAmount,
                isZf:parseFloat(this.billsList[i].settlementAmount)>0,
                number:this.billsList[i].number,
                businessDate:this.billsList[i].businessDate,
                roomPk:this.billsList[i].roomPk,
                roomNumber:this.billsList[i].roomNumber,
                roomTypeName:this.billsList[i].roomTypeName,
                remark:this.billsList[i].remark,
                createUserName:userInfo.upmsRealName,
                payment:this.billsList[i].payment,
                createTime:this.billsList[i].createTime,
                channelTypePk:this.billsList[i].channelTypePk,
              })

              if(channelTypePk == null || channelTypePk == ''){
                channelTypePk = this.billsList[i].channelTypePk
              }
              if(dumbPk == null || dumbPk== ''){
                dumbPk = this.billsList[i].dumbPk
              }
              if(billType == null || billType == ''){
                billType = this.billsList[i].billType
              }
            }
            this.virMomeyChange()
            var order = this.currOrderInfo.order
            var guestList = this.currOrderInfo.guestList

            var beginDate = null
            var endDate = null
            var currPrice = ""
            var memNames = ''
            var roomNumbers = ''
            for(var i=0;i<guestList.length;i++){
              if(beginDate == null || guestList[i].beginDate<beginDate){
                beginDate = guestList[i].beginDate
              }
              if(endDate == null || guestList[i].endDate>endDate){
                endDate = guestList[i].endDate
              }
              if(guestList[i].currPrice){
                currPrice += parseFloat(guestList[i].currPrice)+","
              }
              if(guestList[i].roomNumber){
                roomNumbers += guestList[i].roomNumber+","
              }
              if(guestList[i].guestName){
                memNames += guestList[i].guestName+","
              }

              this.virGuestList.push({
                guestOrderPk:guestList[i].guestOrderPk,
                orderNo:guestList[i].orderGuestNo
              })
            }
            currPrice = currPrice.length>1?currPrice.substring(0,currPrice.length-1):currPrice
            roomNumbers = roomNumbers.length > 0?roomNumbers.substring(0,roomNumbers.length-1):roomNumbers
            memNames = memNames.length > 0?memNames.substring(0,memNames.length-1):memNames
            this.virtualBill = {
              orderPk:order.orderPk,
              orderNo:order.orderNo,
              memNames:memNames,
              dumbPk:dumbPk,
              billType:billType,
              remark:order.remark,
              roomNumbers:roomNumbers,
              beginDate:beginDate,
              endDate:endDate,
              currPrice:currPrice
            }
            this.virPk = null
            this.virDialog = true;
          }).catch(() => {

          });
        },
        addVirtualClick(){
          for(var i=0;i<this.virtualBillDatailList.length;i++){
            if(this.virtualBillDatailList[i].projectPk == null || this.virtualBillDatailList[i].projectPk == ''){
              this.$message({
                message: "请选择账单"+(i+1)+"的项目",
                type: 'warning'
              });
              return
            }
            if(this.virtualBillDatailList[i].projectPk == null || this.virtualBillDatailList[i].projectPk == ''){
              this.$message({
                message: "请填写账单"+(i+1)+"的消费金额",
                type: 'warning'
              });
              return
            }
          }
          this.virtualBill.virtualBillPk = this.virPk?this.virPk:''
          var data = {
            pmsVirtualBillPo:this.virtualBill,
            pmsVirtualBillDetailPos:this.virtualBillDatailList
          }
          addVirtual(data).then(res => {
            if(res.code == 1){
              this.$message({
                message: res.sub_msg,
                type: 'success'
              });
              this.virPk = res.data
            }
          })
        },
        projectChangeClick(index){
          this.currentVirIndex = index
          this.virProjectType = "ALL"
          this.allProjectList = this.conProjectList
          this.projectSelectDialog = true
        },
        projectTypeChange(){
          if(this.virProjectType == "ALL"){
            this.allProjectList = this.conProjectList
          }else if(this.virProjectType == "ZF"){
            this.allProjectList = this.roomProjectList
          }else{
            this.allProjectList = []
            for(var i=0;i<this.conProjectList.length;i++){
              if(this.virProjectType == this.conProjectList[i].typeCode){
                this.allProjectList.push(this.conProjectList[i])
              }
            }
          }
        },
        handleProjectChange(val) {
          this.virtualBillDatailList[this.currentVirIndex].projectCode = val.code
          this.virtualBillDatailList[this.currentVirIndex].projectName = val.projectName
          this.virtualBillDatailList[this.currentVirIndex].projectPk = val.projectPk
          this.virtualBillDatailList[this.currentVirIndex].consumptionAmount = val.projectPrice
          this.virtualBillDatailList[this.currentVirIndex].isZf = val.projectType == "SETTLEMENT"
          this.virMomeyChange()
          this.projectSelectDialog = false
        },
        //删除虚拟单详情
        delVirDetailListClick(index){
          this.virtualBillDatailList.splice(index,1)
          this.virMomeyChange()
        },
        //添加虚拟单详情
        addVirDetailListClick(){
          var userInfo = JSON.parse(localStorage.getItem("pms_userinfo"));
          this.virtualBillDatailList.unshift({
                guestOrderPk:this.virtualBillDatailList[0].guestOrderPk,
                billCode:"",
                dumbPk:"",
                memName:"",
                projectPk:"",
                projectCode:"",
                projectName:"",
                goodsOrderPk:"",
                billType:this.isDubm?'DUMB':'ROOM',
                consumptionAmount:0,
                settlementAmount:0,
                isZf:false,
                number:1,
                businessDate:Moment().format("YYYY-MM-DD"),
                roomPk:"",
                roomNumber:"",
                roomTypeName:"",
                remark:"",
                createUserName:userInfo.upmsRealName,
                payment:-1,
                createTime:Moment().format("YYYY-MM-DD HH:mm:ss"),
                channelTypePk:"",
          })
        },
        //金额发生改变
        virMomeyChange(){
          var consumptionAmount = 0
          var settlementAmount = 0
          for(var i=0;i<this.virtualBillDatailList.length;i++){
            consumptionAmount = consumptionAmount + parseFloat(this.virtualBillDatailList[i].consumptionAmount)
            settlementAmount = settlementAmount + parseFloat(this.virtualBillDatailList[i].settlementAmount)
          }
          this.consumptionAmount = consumptionAmount
          this.settlementAmount = settlementAmount
        },
        //虚拟订单打印
        virPringClick(){
          window.open(this.PRINT_ROOT+'#/virtualBill?virtualBillPk='+this.virPk+"&beginDate="+this.virtualBill.beginDate+"&endDate="+this.virtualBill.beginDate+"&currPrice="+this.virtualBill.currPrice)
        },
        //过滤出下拉客单
        getAddBillFilter(select) {
          let temp = []
          select.forEach(item=>{
            if(item.orderStatus=="CHECKIN" || item.orderStatus=='RESERVE' || item.orderStatus=='LEAVENOPAY') {
              temp.push(item)
            }
          })
          return temp;
        },
        //限制账单勾选，只有未结账的才可以勾选
        billSelectable(row,index) {
          if(row.billStatus=='UN_SET') {
            return true;
          }else {
            return false;
          }
        },
		    //恢复客单
        toDialogRecoverBill() {
          this.$refs.dialogRecoverBillRef.showDialog(this.currOrderInfo.order.orderPk)
		    },
        //批量入账
        dialogBatchEntryClick() {
          this.$refs.dialogBatchAddBillRef.showDialog(this.currOrderInfo.order.orderPk, this.isDubm,null,this.dumbPk)
        },
        //退房超时提醒,跳转批量入账
        timeoutRemindToAddBill(guestPks) {
          this.$refs.dialogBatchAddBillRef.showDialog(this.currOrderInfo.order.orderPk, this.isDubm, guestPks)
        },
        // dialogBatchEntryClick(){
        //   this.formAddBills = [{
        //     projectPk:'',
        //     guestOrderPk: null,
        //     channelTypePk: null,
        //     projectName: '',
        //     consumptionAmount: '',
        //     remark: '',
        //     payment: '0',
        //   }]
        //   this.dialogBatchEntry = true
        // },
        // addFormAddBillsClick(){
        //   this.formAddBills.push({
        //     projectPk:'',
        //     guestOrderPk: null,
        //     channelTypePk: null,
        //     projectName: '',
        //     consumptionAmount: '',
        //     remark: '',
        //     payment: '0',
        //   })
        // },
        // delFormAddBillsClick(index){
        //   this.formAddBills.splice(index,1)
        //   this.addBillMomeyChange()
        // },
        // delFormAddBillsClicks(){
        //   for(var i=0;i<this.addBillMultipleSelection.length;i++){
        //     for(var j=0;j<this.formAddBills.length;j++){
        //       if(this.addBillMultipleSelection[i] == this.formAddBills[j]){
        //         this.formAddBills.splice(j,1)
        //         break;
        //       }
        //     }
        //   }
        //   this.addBillMomeyChange()
        // },
        consumptionSummary(list){
          var tempList = []
          list.forEach((item,index) => {
            if(item.consumptionAmount >0 && item.number >0){
              tempList.push({
                projectName:item.projectName,
                consumptionAmount:item.consumptionAmount * item.number,
                projectPk:item.projectPk
              })
            }
          })
          var tempMoney = 0;
          var tempData = tempList.sort((a,b)=>a.projectPk-b.projectPk);
          var temp2 = []
          var tempObj = {}
          tempData.forEach((item,index) => {
              if(tempObj.projectPk != item.projectPk){
                tempObj = item
                temp2.push(item)
              }else{
                temp2[temp2.length-1].consumptionAmount = temp2[temp2.length-1].consumptionAmount + item.consumptionAmount
              }
          })
          return temp2
        },
        settlementAmountSummary(list){
          var tempList = []
          list.forEach((item,index) => { 
            if(item.settlementAmount != 0 && item.number >0){
              tempList.push({
                projectName:item.projectName,
                settlementAmount:item.settlementAmount * item.number,
                projectPk:item.projectPk
              })
            }
          })
          var tempMoney = 0;
          var tempData = tempList.sort((a,b)=>a.projectPk-b.projectPk);
          var temp2 = []
          var tempObj = {}
          tempData.forEach((item,index) => {
              if(tempObj.projectPk != item.projectPk){
                tempObj = item
                temp2.push(item)
              }else{
                temp2[temp2.length-1].settlementAmount = temp2[temp2.length-1].settlementAmount + item.settlementAmount
              }
          })
          return temp2
        },
        transferAccountsClick(){
          if(this.serachForm.state!='UN_SET'){
            this.$message({type:'warning', message:'请选择未结账的账单'})
            return;
          }
          let select = this.multipleSelection;
          let pks = []
          if(select.length<=0){
            this.$message({type:'warning', message:'请至少选择一条未结账的账单'})
            return;
          }
          this.$refs.transferAccountsRef.choseGroup()
        },
        transferAccounts(row,isDumb){
            this.tagetTransferAccounts = row
            var msg = ''
            if(isDumb){
              msg = '确认转到组单号为:'+row.orderNo+' 的哑房账:'+row.name+'下?'
            }else{
              msg = '确认转到:'+(row.roomNumber | 0)+'号房 客人'+row.guestName+' 所在的组单:'+row.orderNo+'下?'
            }
            this.$prompt(msg, '转账备注', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              //旧数据
              let oldList = this.multipleSelection;
              var data = {
                oldList:oldList,
                remark:value,
                isDumb:isDumb?'Y':'N',
                thirdPk:isDumb?row.dumbPk:row.orderPk
              }
              transferAccountsBill(data).then(res => {
                if(res.code == 1){
                  this.$message({
                    message: res.sub_msg,
                    type: 'success'
                  });
                  this.listBill()
                }
              })
              // var targetList = [];
              
              // for(var i=0;i<oldList.length;i++){
              //   //目标对象
              //   var tempObj = this.clone(oldList[i]);
              //   //标识转账
              //   oldList[i].billClassify = 'FORWARD'

              //   tempObj.dumbPk = isDubm?row.dumbPk:null
              //   tempObj.orderPk = isDubm?null:row.orderPk
              //   tempObj.billType = isDubm?'DUMB':'ROOM'
              //   tempObj.billStatus = 'UN_SET'
              //   targetList.push(tempObj)
              // }

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消转账'
              });       
            });
        }
      },
      clone(obj){
        return JSON.parse(JSON.stringify(obj))
      },
      mounted() {
        bus.$on('billload', () => { this.listBill() })
      },
      filters:{
        //所选
        changeconsumptionAmount(list){
          if(list.length == 0){
            return 0.00
          }
          var momey = 0.00;
          list.forEach((item,index) => {
            momey = momey + item.consumptionAmount * item.number
          })
          return momey.toFixed(2);
        },
        changeSettlementAmount(list){
          if(list.length == 0){
            return 0.00
          }
          var momey = 0.00;
          list.forEach((item,index) => {
            momey = momey + item.settlementAmount * item.number
          })
          return momey.toFixed(2);
        },changeYE(list){
          if(list.length == 0){
            return 0.00
          }
          var momey = 0.00;
          var money2 = 0.00
          list.forEach((item,index) => {
            momey = momey + item.consumptionAmount * item.number
            money2 = money2 + item.settlementAmount * item.number
          })
          return momey-money2.toFixed(2);
        },
        consumptionSummary(list){
          console.log(list.length)
          return list
        }
      }
    }
