<template>
  <div class="table-container">
    <base-table
      ref="baseTable"
      :table-data="tableData"
      :tableConfig="tableConfig"
      :toolbar="toolbar"
      :width="250"
      :checkBox="false"
      :number="false"
      row-id="id"
      saveUrl="saveUser"
      v-on:editClose="editClose"
      v-on:handlePageChange="handlePageChange"
      :tablePage="tablePage"
      :loading="loading"
    >
    
      <!--操作按钮  -->
      <template #tool>
        <el-button size="small" type="primary" icon="iconfont icon-daochu" @click="educe()">导出</el-button>
      </template>
      <template #rightTool>
        <!-- <el-checkbox   style="margin-right:10px" v-model="tablePage.viewAllData"  :border="true" size="small"></el-checkbox> -->
        <el-date-picker
          v-model.trim="tablePage.time"
          value-format="yyyy-MM-dd"
          size="small"
          type="daterange"
          style="margin-right: 10px"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
        <el-input
          v-model.trim="tablePage.keyWords"
          placeholder="员工姓名 / 项目名称 / 客户名称"
          style="width: 300px; margin-right: 10px"
          size="small"
          clearable
        ></el-input>
        <el-button class="search" size="small" type="primary" @click="getList">
          <i class="vxe-icon--search" />
        </el-button>
      </template>
      <!--操作按钮  -->
      <template #toolBtns="{ row }">
        <vxe-button
          status="primary"
          icon="fa fa-pencil-square-o"
          content="编辑"
          size="mini"
          @click="edit(row)"
        ></vxe-button>
        <vxe-button
          status="danger"
          icon="fa fa-trash-o"
          content="删除"
          size="mini"
          @click="remove(row)"
        ></vxe-button>
      </template>
    </base-table>
  </div>
</template>

<script>
import BaseTable from "@/components/basetable/index";
import timeBillField from "@/config/table1/table1.field";
import { formItemConfig, formMethods } from "@/config/formItemConfig";

export default {
  name: 'table1',
  components: {
    BaseTable,
  },
  data() {
    return {
      loading: false,
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
        viewAllData: false,
        keyWords: "",
        time: []
      },
      submitLoading: false,
      tableData: [
        {
          aa: "Test1",
          bb: "T1",
          cc: "Develop",
          dd: "0",
          ee: ["0"],
          ff: 40,
          gg: 28,
        },
        {
          aa: "Test1",
          bb: "T1",
          cc: "Develop",
          dd: "0",
          ee: ["0"],
          ff: 40,
          gg: 28,
        },
        {
          aa: "Test1",
          bb: "T1",
          cc: "Develop",
          dd: "0",
          ee: ["0"],
          ff: 40,
          gg: 28,
        },
        {
          aa: "Test1",
          bb: "T1",
          cc: "Develop",
          dd: "0",
          ee: ["0"],
          ff: 40,
          gg: 28,
        },
        {
          aa: "Test1",
          bb: "T1",
          cc: "Develop",
          dd: "0",
          ee: ["0"],
          ff: 40,
          gg: 28,
        },
      ], //表格数据
      //表头配置
      tableConfig: {
        columns: [
          "aa",
          "bb",
          "cc",
          "dd",
          "ee",
          "ff",
          "gg"
        ],
        fieldConfig: timeBillField
      },
      toolbar: {
        // add: true,
        search: false
      },
    };
  },
  mounted(){
  },
  methods: {
        // 导出
    async educe() {
      const types = this?.$refs?.baseTable
        ?.getRef()
        ?.getCheckboxRecords()
        ?.map((item) => item?.type || "");
      if (types.length > 0) {
        // const results = await this.$api.getMappingTable(types);
        // results.forEach((item) => {
        //   this.$api.convertRes2Blob(item);
        // });
        this.$message({content:"导出成功"})
      } else {
        this.$message({
          type: "error",
          message: "请勾选数据",
        });
      }
    },

    //分页
    handlePageChange(){
      Object.assign(this.tablePage, data);
      this.getList(data);
    },
    // 新增report
    addReport() {
      this.formData = {
        headFlag: false
      }
      this.isAdd = 1
      this.showAdd = true
    },
    //单元格是否修改
    editClose({ row, column }) {
      const $table = this.$refs.baseTable.getRef()
      const field = column.property
      const cellValue = row[field]
      // 判断单元格值是否被修改
      console.log(row)
    },
    // 编辑
    edit(row) {
      console.log(row);
    },
    //删除
    remove(row) {
      this.$XModal.confirm("您确定要删除该数据?").then(type => {
        if (type === "confirm") {
            this.$XModal.message({ content: "删除成功", status: "success" });
            this.getList();
        }
      });
    },
    //列表
    getList() {
      console.log("111");
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
