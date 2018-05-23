// 选择客人(选择客历)
<template>
    <div>
        <el-dialog class="agreement-body" title="选择客历" :visible.sync="chooseAGuest" width="800px" :append-to-body="true">
            <div class="body-conten" style="display: table">
                <el-col :span="24">
                    <el-form :inline="true" :model="formAGuest" size="mini" class="demo-form-inline">
                        <el-form-item label="会员卡号">
                            <el-input v-model="formAGuest.cardNumber" placeholder="会员卡号"></el-input>
                        </el-form-item>
                        <el-form-item label="客户姓名">
                            <el-input v-model="formAGuest.memName" placeholder="客户姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="证件号码">
                            <el-input v-model="formAGuest.certificateNo" placeholder="证件号码"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码">
                            <el-input v-model="formAGuest.memPhone" placeholder="手机号码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="search()">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="24">
                    <el-table :data="tableAGuestData" border height="350" style="width: 100%" @row-dblclick="choose">
                        <el-table-column prop="memName" label="客户姓名"></el-table-column>
                        <el-table-column prop="memSex" label="性别">
                            <template slot-scope="scope">
                                <span>{{sexMap[scope.row.memSex]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cardNumber" label="会员卡号"></el-table-column>
                        <el-table-column prop="certificateType" label="证件类型">
                            <template slot-scope="scope">
                                <span>{{certificateMap[scope.row.certificateType]}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="certificateNo" label="证件号码"></el-table-column>
                        <el-table-column prop="memPhone" label="手机号码"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                        <el-table-column prop="" label="投诉"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="hobbySetting = true">爱好设置</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button size="mini" type="primary">确定</el-button> -->
                <el-button size="mini" type="primary" @click="chooseAGuest = false">关闭</el-button>
            </span>
        </el-dialog>
        <!--爱好设置 -->
        <el-dialog class="agreement-body" title="客人喜好设置" :visible.sync="hobbySetting" width="40%" :append-to-body="true">
            <div class="body-conten">
                <el-col :span="24">
                    <el-form ref="formHobby" :model="formHobby" size="mini" label-width="80px">
                        <el-form-item label-width="0">
                            <el-col :span="12">
                                <el-form-item label="卡    号">Hl46546</el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="姓    名">键盘侠</el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label-width="0">
                            <el-col :span="12">
                                <el-form-item label="性    别">男</el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="生日"></el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="客房喜好">
                            <el-input v-model="formHobby.user" placeholder="客房喜好"></el-input>
                        </el-form-item>
                        <el-form-item label="餐饮喜好">
                            <el-input v-model="formHobby.user" placeholder="餐饮喜好"></el-input>
                        </el-form-item>
                        <el-form-item label="特殊要求">
                            <el-input v-model="formHobby.user" placeholder="特殊要求"></el-input>
                        </el-form-item>
                        <el-form-item label="兴趣爱好">
                            <el-input v-model="formHobby.user" placeholder="兴趣爱好"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary">保存信息</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { listMemberCondition } from "@/api/customerRelation/pmsMemberController";
export default {
  data() {
    return {
      formAGuest: {},
      tableAGuestData: [],
      chooseAGuest: false,
      formHobby: {},
      hobbySetting: false,
      sexMap: {
        M: "男",
        W: "女"
      },
      certificateMap: {
        TWO_IDENTITY: "二代身份证",
        ONE_IDENTITY: "一代身份证",
        ORDER: "其他",
        DRIVER: "驾驶证",
        PASSPORT: "护照",
        OFFICERS: "军官证",
        SOLDIER: "士兵证",
        HK_MACAO_PASS: "港澳通行证",
        RETURN_HOME: "回乡证",
        TEMP_IDENTITY: "临时身份证",
        BOOKLET: "户口簿",
        POLICE_OFFICER: "警官证"
      }
    };
  },
  methods: {
    /**
     * 初始化：根据客户姓名查找
     * @augments guestName 客户姓名（筛选条件：可选）
     * */
    init(guestName) {
      this.resetForm();
      this.formAGuest.memName = guestName;
      this.chooseAGuest = true;
      this.search();
    },
    /**
     * 初始化：根据客户手机号查找
     * @augments phone 手机号*/
    initByPhone(phone) {
      this.resetForm();
      this.formAGuest.memPhone = phone;
      this.search(_ => {
        if (this.tableAGuestData.length == 1) {
          //只有一个，直接返回
          this.$emit("sendGuest", this.tableAGuestData[0]);
        } else if (this.tableAGuestData.length > 1) {
          //有多个，弹窗选择
          this.chooseAGuest = true;
        }
      });
    },
    resetForm() {
      this.formAGuest.cardNumber = null;
      this.formAGuest.memName = null;
      this.formAGuest.certificateNo = null;
      this.formAGuest.memPhone = null;
    },
    search(callback) {
      listMemberCondition(this.formAGuest).then(res => {
        this.tableAGuestData = res.data;
        callback();
      });
    },
    choose(row, event) {
      //双击选择用户
      this.$emit("sendGuest", row);
      this.chooseAGuest = false;
    }
  }
};
</script>
<style scoped>
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 5px;
}
.el-button--mini, .el-button--mini.is-round {
    padding: 5px 15px;
}
</style>
<style>
.agreement-body > .el-dialog > .el-dialog__header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.agreement-body > .el-dialog > .el-dialog__body {
  padding: 0 15px;
}
</style>


