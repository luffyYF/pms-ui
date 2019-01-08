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
  // API
  import {findOrder} from '@/api/order/pmsOrderController'
  import {gmCount} from "@/api/goods/goodsManageController";
  import { listByProjectType } from '@/api/systemSet/pmsProjectController'
  import {
    addBill,
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
      components:{dialogBorrow, commentPrint, billSettlement, dialogRecoverBill},
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
          virDialog:false,
          tableData: [{
            name: '',
          }],
          tableData1: [],
          activeName2: 'first',
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
          isDubm:false
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
          let beginDate = this.currOrderInfo.guestList[0].beginDate|new Date()
          let endDate = this.currOrderInfo.guestList[0].endDate|new Date()
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
                // if(this.currOrderInfo.order.hfFlag=='Y'){
                //   this.$refs.billSettlementRef.init(this.orderPk, 3, '',this.currOrderInfo.order.hfCashPledge)
                // }else{
                //   this.$refs.billSettlementRef.init(this.orderPk, 1)
                // }
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
                //检测入住的客单是否超过退房时间，进行提醒
                overtimeRemind({orderPk: this.orderPk}).then(res=>{
                  if(res.data.length>0) {
                    let message = '<p>以下入住客单超过了退房时间，可能需要收取额外费用：</p>';
                    message += "<table cellpadding='3'>"
                    message += "<tr><td>房号</td><td>客人姓名</td><td>离店日期</td></tr>";
                    for(let obj of res.data) {
                      message += "<tr style='font-weight:bold;'><td>"+obj.roomNumber+"</td><td>"+obj.guestName+"</td><td>"+obj.endDate+"</td></tr>"
                    }
                    message += "</table>"
                    this.$msgbox({
                      title: '提醒',
                      message: message,
                      showCancelButton: true,
                      dangerouslyUseHTMLString: true,
                      confirmButtonText: '不收取，继续结账',
                      cancelButtonText: '取消',
                    }).then(action => {
                      this.$refs.billSettlementRef.init(this.orderPk, 0)
                    });
                  }else{
                    this.$refs.billSettlementRef.init(this.orderPk, 0)
                  }
                })
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
           
            var roomNumbers = ''
            var channelTypePk = ''
            var memNames = ''
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
              roomNumbers += this.billsList[i].roomNumber+","
              if(this.billsList[i].memName != null){
                memNames += this.billsList[i].memName+","
              }
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
        }
        ,
        handleProjectChange(val) {
          this.virtualBillDatailList[this.currentVirIndex].projectCode = val.code
          this.virtualBillDatailList[this.currentVirIndex].projectName = val.projectName
          this.virtualBillDatailList[this.currentVirIndex].projectPk = val.projectPk
          this.virtualBillDatailList[this.currentVirIndex].consumptionAmount = val.projectPrice
          this.virtualBillDatailList[this.currentVirIndex].isZf = val.projectType == "SETTLEMENT"
          this.virMomeyChange()
          this.projectSelectDialog = false
        },
        delVirDetailListClick(index){
          this.virtualBillDatailList.splice(index,1)
          this.virMomeyChange()
        },
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
                billType:"",
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
                createTime:Moment().format("YYYY-MM-DD"),
                channelTypePk:"",
          })
        },
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
        virPringClick() {
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
        }
      },
      mounted() {
        bus.$on('billload', () => { this.listBill() })
      },
    }