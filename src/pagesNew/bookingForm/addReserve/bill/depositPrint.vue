<template>
  <div>
      <el-dialog class="pattern-dialog" title="打印" :visible.sync="depositPrint" width="50%" :before-close="handleClose" :append-to-body=true>
      <div class="pattern-dialog-container" style="padding: 25px 4px;">
        <el-col :span="24"><el-button size="mini" type="primary">打印</el-button></el-col>
        <el-col :span="24" style="margin-top:10px;background: #fff;">
          <p style="text-align: center;">
            <sapn class="left">Printer:深圳前海豪斯菲尔	</sapn>
            <strong>押金账单(Deposit)  (No.95160)</strong>
            <span class="right">	2018/03/07  14:39:59</span>
          </p>
          <table border="1" style="width:100%;margin-bottom:10px">
            <tr>
              <td colspan="9">
                <sapn>组单:	3843</sapn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <sapn>客单:	4435</sapn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <sapn>姓名:	导游</sapn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <sapn>性别:	男</sapn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <sapn>国家:		</sapn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <sapn>证件号:</sapn>
              </td>
            </tr>
            <tr>
              <td>房号</td>												
              <td>押金</td>
              <td>房价</td>
              <td>来店时间</td>
              <td>离店时间</td>
              <td>营业日期</td>
              <td>操作员</td>
              <td>操作时间</td>
              <td>凭证号</td>
            </tr>
            <tr>
              <td>02/28</td>					
              <td>301</td>
              <td>吧</td>
              <td>夜核房费(日结计算房租)</td>
              <td>450.00</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td colspan="2"><b>押金总计:</b></td>
              <td colspan="7"><b>￥111.00</b></td>
            </tr>
          </table>
          
        </el-col>
      </div>
      <span slot="footer" class="dialog-footer"> 
        <el-button size="mini" type="primary">确认</el-button>
        <el-button size="mini" type="primary">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
