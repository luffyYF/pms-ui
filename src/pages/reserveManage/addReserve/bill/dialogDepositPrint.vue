<template>
    <div>
        <el-dialog class="pattern-dialog" title="押金打印" :visible.sync="dialogDepositPrint" width="50%" :before-close="handleClose" :append-to-body=true>
            <div class="pattern-dialog-container" style="padding: 25px 4px;">
                <el-col :span="24">
                <div class="demo-input-suffix">
                    请选择客单：
                    <el-select v-model="form.region" size="mini" placeholder="所以客单" style="width:80%">
                        <el-option label="房间号：302 客人姓名：陆少游" value="shanghai"></el-option>
                        <el-option label="房间号：303 客人姓名：陆少游" value="beijing"></el-option>
                    </el-select>
                </div>
                </el-col>
                <el-col :span="24">
                <el-table :data="tableData" height="250" border style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>					
                    <el-table-column prop="date" label="金额"></el-table-column>
                    <el-table-column prop="date" label="房号"></el-table-column>
                    <el-table-column prop="date" label="客单号"></el-table-column>
                    <el-table-column prop="date" label="发生日期"></el-table-column>
                    <el-table-column prop="date" label="操作员"></el-table-column>
                    <el-table-column prop="date" label="营业日期"></el-table-column>
                </el-table>
                </el-col>
            </div>
            <span slot="footer" class="dialog-footer"> 
                <el-button size="mini" type="primary" @click="depositPrint = true">打印</el-button>
                <el-button size="mini" type="primary">取消</el-button>
            </span>
        </el-dialog> 
    </div>
</template>
