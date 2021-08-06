<template>
  <div class="workBench-container">
    <base-table
      ref="baseTable"
      :showIconTool="false"
      :table-data="tableData"
      :tableConfig="tableConfig"
      :toolbar="toolbar"
      :width="180"
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
        <el-button size="small" type="primary" icon="iconfont icon-xinzeng1" @click="addReport()">新增</el-button>
      </template>
      <template #rightTool>
        <!-- <el-checkbox   style="margin-right:10px" v-model="tablePage.viewAllData"  :border="true" size="small"></el-checkbox> -->
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

    <!-- 表单弹出框 -->
    <vxe-modal
      v-if="showAdd"
      v-model="showAdd"
      :title="'新增/编辑'"
      width="800"
      min-width="300"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <template #default>
        <vxe-form
          ref="Xform"
          :data="formData"
          :items="formItems"
          :rules="formRules"
          title-align="right"
          title-width="150"
          @submit="submitEvent"
          @click="input()"
        />
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import BaseTable from "@/components/basetable/index";
import TreeTable from "@/components/treetable/index";
import pmField from "@/config/table2/table2.field";
import { formItemConfig, formMethods } from "@/config/formItemConfig";
import financeItems from "@/config/table2/table2.form";

export default {
    name: "table2",
  components: {
    BaseTable,
    TreeTable
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
      showAdd: false, //是否显示新增
      submitLoading: false, //提交加载
      formItems: {},
      isAdd: 1,
      formRules: {
        xmbm: [
          { required: true, message: "请输入项目编码" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" }
        ], //key为表格字段
        xmmc: [
          { required: true, message: "请输入项目名称" },
          { min: 6, max: 15, message: "长度在 3 到 5 个字符" }
        ]
      },

      tableData: [
        {
          aa: "Develop",
          bb: "0",
          cc: "小明",
          dd: "项目经理",
          ee: "0001"
        },
        {
          aa: "Develop",
          bb: "0",
          cc: "小明",
          dd: "项目经理",
          ee: "0001"
        },
      ], //表格数据
      //表头配置
      tableConfig: {
        columns: ["aa", "bb", "cc", "dd", "ee"],
        fieldConfig: pmField
      },
      toolbar: {
        // add: true,
        search: false
      },
      formData: {
        headFlag: false
      }
    };
  },
  mounted() {
    const fieldConfig = ["aa", "bb", "cc", "dd", "ee"];
    const formList = ["aa", "bb", "cc", "dd", "ee"].filter(item =>
      fieldConfig.includes(item)
    );
    this.formItems = formMethods.getFields(formList, financeItems); //financeItems为引入文件
  },
  methods: {
    input() {
      // params:this.formItems.name
      // this.$api
    },
    // 新增确认
    submitEvent(e) {
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
        this.showEdit = false;
        if (this.isAdd == 1) {
          this.$XModal.message({ content: "新增成功", status: "success" });
          this.showAdd = false;
        } else {
          this.$XModal.message({ content: "编辑成功", status: "success" });
          this.showAdd = false;
        }
      }, 500);
    },
    //分页
    handlePageChange() {
      Object.assign(this.tablePage, data);
      this.getList(data);
    },
    // 新增report
    addReport() {
      this.formData = {
        headFlag: false
      };
      this.isAdd = 1;
      this.showAdd = true;
    },
    //单元格是否修改
    editClose({ row, column }) {
      const $table = this.$refs.baseTable.getRef();
      const field = column.property;
      const cellValue = row[field];
      // 判断单元格值是否被修改
      console.log(row);
    },
    // 编辑
    edit(row) {
      this.isAdd = 2
      this.showAdd = true
      console.log(row)
    },
    //删除
    remove(row) {
      this.$XModal.confirm("您确定要删除该数据?").then(type => {
        if (type === "confirm") {
          const $table = this.$refs.baseTable.getRef()
          console.log($table)
          $table.remove(row);
          this.$XModal.message({ content: '删除成功', status: 'success' })
          this.getList();
        }
      });
    },
    //列表
    async getList() {
      console.log("11")
      this.tableData = []
    },
  }
};
</script>

<style lang="scss" scoped>

</style>
