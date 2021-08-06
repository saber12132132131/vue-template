<template>
  <div class="app-container">
    <div class="toolbarList">
      <vxe-toolbar v-if="showToolBar" ref="xTable">
        <template v-slot:buttons>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <slot name="tool"></slot>
            </el-form-item>
            <el-form-item>
              <el-button
                v-if="toolbar.add"
                size="small"
                type="primary"
                icon="fa fa-plus"
                @click="insertEvent()"
              >
                新增
              </el-button>
              <el-button
                v-if="toolbar.save"
                size="small"
                type="success"
                icon="fa fa-save"
                @click="saveEvent()"
              >
                保存
              </el-button>
              <el-button v-if="toolbar.import" size="small" type="success">
                <el-upload action="" :show-file-list="false" accept=".xlsx">
                  导入
                </el-upload>
              </el-button>
              <el-button v-if="toolbar.export" size="small" type="primary" class="light">
                导出
              </el-button>
            </el-form-item>
            <el-form-item style="float: right">
              <slot name="rightTool"></slot>
            </el-form-item>
            <el-form-item style="float: right" v-if="toolbar.search">
              <el-button size="small" type="primary" @click="getList"
                ><i class="vxe-icon--search"
              /></el-button>
            </el-form-item>
            <!--            <el-form-item style="float: right" v-if="toolbar.search">-->
            <!--              <el-input-->
            <!--                v-model.trim="keyWords"-->
            <!--                style="width: 300px"-->
            <!--                size="small"-->
            <!--                placeholder="请输入编号/名称/客户代号/客户名称"-->
            <!--              />-->
            <!--            </el-form-item>-->
            <el-form-item style="float: right" v-if="toolbar.search">
              <el-input
                v-model.trim="keyWords"
                style="width: 300px"
                size="small"
                placeholder="请输入编号/名称/客户代号/客户名称"
                ><i slot="suffix" class="fa fa-qrcode fa-2x" style="margin-top: 8px"></i>
              </el-input>
            </el-form-item>
            <el-form-item style="float: right" v-if="toolbar.search">
              <el-date-picker
                v-model.trim="value1"
                size="small"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-form>
        </template>
      </vxe-toolbar>
      <vxe-toolbar v-if="showIconTool" ref="xTable" custom>
        <template v-slot:buttons></template>
      </vxe-toolbar>
    </div>
    <div class="tableContainer">
      <vxe-table
        ref="xTable"
        :data="tableData.length > 0 ? tableData : getList()"
        border
        resizable
        row-key
        column-key
        show-overflow
        highlight-hover-row
        height="auto"
        :row-id="rowId"
        :export-config="exportConfig"
        :import-config="importConfig"
        :edit-rules="editRules"
        :edit-config="{
          trigger: 'dblclick',
          mode: 'cell',
          showStatus: true,
          activeMethod: activeMethod,
        }"
        align="center"
        auto-resize
        keep-source
        :loading="loading"
        type="checkbox"
        :checkbox-config="checkboxConfig"
        class="sortable-column-demo"
        :scroll-x="{ enabled: false }"
        @edit-closed="editClosedEvent"
        @checkbox-change="selectChangeEvent"
        @checkbox-all="selectChangeEvent"
        @edit-disabled="editDisabledEvent"
      >
        <vxe-table-column v-if="checkBox" type="checkbox" width="100" fixed="left" />
        <vxe-table-column
          v-if="number"
          field="order"
          title="Order"
          type="seq"
          width="60"
        />
        <vxe-table-column
          v-for="item in columns"
          :key="item.field"
          :field="item.field"
          :title="item.title"
          :cell-render="item.cellRender"
          :edit-render="item.editRender"
          :width="item.width"
          min-width="200"
        />

        <vxe-table-column
          v-if="showOperation"
          title="操作"
          :width="width"
          show-overflow
          fixed="right"
        >
          <template #default="{ row, rowIndex }">
            <slot name="toolBtns" :row="row" :rowIndex="rowIndex"></slot>
            <vxe-button
              v-if="tool.edit"
              status="primary"
              icon="fa fa-edit"
              content="编辑"
              size="mini"
              @click="editEvent(row, rowIndex)"
            ></vxe-button>
            <vxe-button
              v-if="tool.del"
              status="danger"
              icon="fa fa-trash-o"
              content="删除"
              size="mini"
              @click="removeEvent(row)"
            ></vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <vxe-pager
      align="center"
      v-if="showPage"
      perfect
      size="mini"
      :loading="loading"
      :current-page="tablePage.currentPage"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange"
    />
    <vxe-modal
      v-if="showEdit"
      :title="selectRow ? '编辑&保存' : '新增&保存'"
      width="800"
      min-width="600"
      min-height="300"
      :loading="submitLoading"
      resize
      destroy-on-close
    >
      <template #default>
        <vxe-form
          :data="formData"
          :items="formItems"
          :rules="formRules"
          title-align="right"
          title-width="100"
          @submit="submitEvent"
        />
      </template>
    </vxe-modal>
  </div>
</template>

<script>
import { filedConfig, fieldMethods } from "../../config/filedConfig";
import { formItemConfig, formMethods } from "../../config/formItemConfig";

export default {
  data() {
    return {
      keyWords: "", // 搜索关键字
      value1: "",
      start: "",
      end: "",
      // loading: false,
      // tablePage: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   totalResult: 0,
      // },
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      formData: {},
    };
  },
  props: {
    activeMethod: {
      type: Function,
      default: () => {
        return true;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tablePage: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10,
        totalResult: 0,
      }),
    },
    checkBox: {
      type: Boolean,
      default: true,
    },
    rowId: {
      type: String,
      default: "id",
    },
    number: {
      type: Boolean,
      default: true,
    },
    showPage: {
      type: Boolean,
      default: true,
    },
    showOperation: {
      type: Boolean,
      default: true,
    },
    apiUrl: {
      type: String,
      default: "",
    },
    getUrl: {
      type: String,
      default: "",
    },
    saveUrl: {
      type: String,
      default: "",
    },
    editUrl: {
      type: String,
      default: "",
    },
    tableConfig: {
      type: Object,
      default: () => {},
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableColumns: {
      type: Array,
      default: () => [],
    },
    formConfig: {
      type: Object,
      default: () => {},
    },
    formRules: {
      type: Object,
      default: () => {},
    },
    toolbar: {
      type: Object,
      default: function () {
        return {
          add: false,
          import: false,
          export: false,
          save: false,
        };
      },
    },
    width: {
      type: Number,
      default: 100,
    },
    // 表格刷新是否立即刷新
    isUpdataIm: {
      type: Boolean,
      default: true,
    },
    showToolBar: {
      type: Boolean,
      default: true,
    },
    showIconTool: {
      type: Boolean,
      default: true,
    },
    tool: {
      type: Object,
      default: function () {
        return {
          edit: false,
          del: false,
        };
      },
    },
  },
  created() {
    console.log(this.columns);
  },
  beforeDestroy() {},
  mounted() {
    this.getList();
  },
  watch: {},
  computed: {
    columns() {
      console.log(this.tableColumns);
      if (this.tableColumns.length > 0) {
        return this.tableColumns;
      } else {
        return fieldMethods.getFields(
          this.tableConfig.columns,
          this.tableConfig.fieldConfig
        );
      }
    },
    formItems() {
      return formMethods.getFields(
        this.formConfig.fields,
        this.tableConfig.formItemConfig
      );
    },
    exportConfig() {
      return this.tableConfig.exportConfig;
    },
    importConfig() {
      return this.tableConfig.importConfig;
    },
    editRules() {
      return this.tableConfig.editRules;
    },
    checkboxConfig() {
      return Object.assign(
        {
          highlight: true,
          range: true,
        },
        this.tableConfig.checkboxConfig
      );
    },
  },
  methods: {
    editDisabledEvent({ row, column }) {
      this.$message({
        message: "禁止编辑",
        type: "error",
      });
    },
    editClosedEvent({ row, column }) {
      this.$nextTick(() => {
        const $table = this.$refs.xTable;
        const field = column.property;
        const cellValue = row[field];
        // 判断单元格值是否被修改
        if ($table.isUpdateByRow(row, field)) {
          setTimeout(() => {
            // this.$XModal.message({
            //   content: `局部保存成功！ ${field}=${cellValue}`,
            //   status: "success",
            // });
            console.log("111111111111");

            this.$emit("editClose", { row, column });
            // 局部更新单元格为已保存状态
            if (this.isUpdataIm) {
              $table.reloadRow(row, null, field);
            }
          }, 300);
        }
      });
    },
    getRef() {
      return this.$refs.xTable;
    },
    linkEvent({ row }) {
      console.log(row.name);
    },
    // 获取页面数据
    getList() {
      let tableData;
      return tableData;
    },
    // 处理换页
    handlePageChange({ currentPage, pageSize }) {
      this.$emit("handlePageChange", { currentPage, pageSize });
      // this.tablePage.currentPage = currentPage;
      // this.tablePage.pageSize = pageSize;
      // console.log(this.tablePage.currentPage, this.tablePage.pageSize);
      // this.getList()
      // this.findList4()
    },
    async insertEvent(row) {
      // console.log(this.isFormUpdata)
      // // 判断是否是表单新增
      // if (this.isFormUpdata) {
      //   this.showEdit = true;
      // } else {
      //   this.toolbar.save = true;
      //   this.toolbar.add = false;
      //   const $table = this.$refs.xTable;
      //   const record = {};
      //   const { row: newRow } = await $table.insertAt(record, row);
      // }
    },
    async saveEvent() {
      // 切换按钮状态
      // this.toolbar.save = false;
      // this.toolbar.add = true;
      // // 获取添加信息
      // const $table = this.$refs.xTable;
      // const {
      //   insertRecords,
      //   removeRecords,
      //   updateRecords,
      // } = $table.getRecordset();
      // await this.$api[this.saveUrl]();
    },
    editEvent(row) {
      // this.formData = {
      //   name: row.name,
      //   nickname: row.nickname,
      //   role: row.role,
      //   sex: row.sex,
      //   age: row.age,
      //   num: row.num,
      //   checkedList: row.checkedList,
      //   flag: row.flag,
      //   date: row.date,
      //   address: row.address
      // }
      // this.selectRow = row
      this.showEdit = true;
    },
    //   editClosedEvent({ row, column }) {
    //   this.$nextTick(() => {
    //     const $table = this.$refs.xTable;
    //     const field = column.property;
    //     const cellValue = row[field];
    //     // 判断单元格值是否被修改
    //     if ($table.isUpdateByRow(row, field)) {
    //       setTimeout(() => {
    //         this.$XModal.message({
    //           content: `局部保存成功！ ${field}=${cellValue}`,
    //           status: "success",
    //         });
    //         // 局部更新单元格为已保存状态
    //         $table.reloadRow(row, null, field);
    //       }, 300);
    //     }
    //   });
    // },
    submitEvent() {
      this.submitLoading = true;
      setTimeout(() => {
        const $table = this.$refs.xTable;
        this.submitLoading = false;
        this.showEdit = false;
        if (this.selectRow) {
          this.$XModal.message({ content: "保存成功", status: "success" });
          Object.assign(this.selectRow, this.formData);
        } else {
          this.$XModal.message({ content: "新增成功", status: "success" });
          $table.insert(this.formData);
        }
      }, 500);
    },
    removeEvent(row) {
      this.$XModal.confirm("您确定要删除该数据?").then((type) => {
        const $table = this.$refs.xTable;

        if (type === "confirm") {
          $table.remove(row);
          this.$XModal.message({ content: "删除成功", status: "success" });
        }
      });
    },
    selectChangeEvent(data) {
      this.$emit("checkboxchange", data);
    },
    getSelectRows() {},
  },
};
</script>

<style scoped>
.app-container {
  width: 100%;
  height: calc(100% - 80px);
}

.tableContainer {
  height: 68vh;
}

.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-ghost,
.sortable-column-demo .vxe-header--row .vxe-header--column.sortable-chosen {
  background-color: #dfecfb;
}

.el-button--primary.dark {
  color: #fff;
  background-color: #0f4980;
  border-color: #0f4980;
}

.el-button--primary.light {
  color: #fff;
  background-color: #1164b4;
  border-color: #1164b4;
}
</style>
