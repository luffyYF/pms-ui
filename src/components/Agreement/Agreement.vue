//协议单位
<template>
  <div>
    <el-dialog class="agreement-body" title="协议单位" :visible.sync="dialogAgreement" width="1000px" :append-to-body="true">
      <div class="body-conten">
        <el-row>
          <el-form ref="form" :model="proForm" size="mini" label-width="100px">
            <el-col :span="24">
              <el-col :span="7">
                <el-form-item label="协议号：" label-width="80px">
                  <el-input v-model="proForm.agreementCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="协议类别：">
                  <el-select v-model="proForm.agreementTypePk" placeholder="请选择协议类别">
                    <el-option v-for="item in typeList" :key="item.typePk" :label="item.typeName" :value="item.typePk">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="单位名称：">
                  <el-input v-model="proForm.unitName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="10px">
                  <el-button size="mini" type="primary" @click="addClick">新增</el-button>
                  <el-button size="mini" type="primary" @click="search">查询</el-button>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-table :data="tableData" height="250" border style="width: 100%" @row-dblclick="chooseAgreement">
                <el-table-column prop="agreementCode" label="协议号">
                  <template slot-scope="scope">
                    {{scope.row.agreementCode}}
                    <!-- <el-radio v-model="radio" :label="scope.row.agreementPk" @change="chooseAgreement">
                      {{scope.row.agreementCode}}
                    </el-radio> -->
                  </template>
                </el-table-column>
                <el-table-column prop="unitName" label="单位名称"></el-table-column>
                <el-table-column prop="typeName" label="协议分类"></el-table-column>
                <el-table-column prop="contactName" label="联系人"></el-table-column>
                <el-table-column prop="comeNum" label="来店次数"></el-table-column>
              </el-table>
              
                <span style="color:red;">注:双击选中</span>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogAgreement = false">取 消</el-button>
      </span>
    </el-dialog>
    <addProtocolUnit ref="addProtocolUnitRef" @callback="search" />
  </div>
</template>

<script>
import bus from "@/utils/bus";
import { listType } from "@/api/systemSet/type/typeController";
import { listProject } from "@/api/customerRelation/ProtocolManage/pmsAgreementController";
import addProtocolUnit from "@/pages/customerRelation/ProtocolManage/addProtocolUnit";
export default {
  components: { addProtocolUnit },
  data() {
    return {
      dialogAgreement:false,
      tableData: [],
      proForm: {},
      typeList: [],
      radio: ""
    };
  },
  // mounted() {
  //   this.init();
  // },
  methods: {
    init() {
      this.dialogAgreement = true;
      //获取协议类型
      listType({ typeMasters: "AGREEMENT" }).then(res => {
        let resData = res.data.data;
        var arr = [];
        var item = {
          typePk: "",
          typeName: "全部"
        };
        arr.push(item);
        for (let index = 0; index < resData.length; index++) {
          const element = resData[index];
          arr.push(element);
        }
        this.typeList = arr;
        this.proForm.typePk = "";

        this.search();
      });
    },
    addClick(){
      this.$refs.addProtocolUnitRef.init()
    },
    //搜索协议单位
    search() {
      //获取协议单位
      listProject(this.proForm).then(res => {
        this.tableData = res.data.data;
      });
    },
    //选中协议单位
    chooseAgreement(row, event) {
      if (!row.priceSchemePk) {
        this.$message({
          type: "info",
          message: "此协议单位未绑定价格方案，请绑定后重试！"
        });
        return;
      }
      this.$emit("sendData", row);
      this.dialogAgreement = false;
      this.radio = "";
      this.proForm = {};
    }
  }
};
</script>
