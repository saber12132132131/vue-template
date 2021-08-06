import VXETable from 'vxe-table'
import thousandInput from "@/components/thousandthInput"
import { divide } from 'xe-utils'
import api from '@/api/index'
// 千分符转换
function comdify(n) {
  if (!n) return n;
  let str = n.toString().split(".");
  let re = /\d{1,3}(?=(\d{3})+$)/g;
  let n1 = str[0].replace(re, "$&,");
  let n2 = str[1];
  if (n2 && n2.length > 0) {
    n2 = n2.replace(re, "$&,");
  }
  // 返回值中，注意当只有一个小数点时，且小数点后面没有数字时（也就是n2===''），要显示小数点
  return str.length > 1 && (n2 || n2 === "") ? `${n1}.${n2}` : `${n1}`;
}
VXETable.renderer.add('MyLink', {
  // 默认显示模板
  renderDefault(h, renderOpts, params) {
    let { row, column } = params
    let { events } = renderOpts
    return [
      <a class="my-link" onClick={() => events.click(params)}>{row[column.property]}</a>
    ]
  }
})
VXETable.renderer.add('thousandth', {

  renderCell(h, renderOpts, params) {
    let { row, column } = params
    let { events } = renderOpts
    let result =row[column.property]
    result=parseFloat(result).toFixed(2)
    return [
         <span>{comdify(result)}</span>
    ]
  }
})
VXETable.renderer.add('password', {

  // 可编辑激活模板
  renderEdit(h, renderOpts, { row, column }) {
    console.log(row, column.property)
    return [
      <vxe-input class="my-cell" v-model={row[column.property]} clearable></vxe-input>
    ]
  },
  // 可编辑显示模板
  renderCell(h, renderOpts, { row, column }) {
    return [
      <span>******</span>
    ]
  },
  // 导出模板，例如导出插槽中自定义的内容
  exportMethod(params) {
    const { row, column } = params
    return '自定义内容'
  }

})
// 创建一个简单的表单-输入框渲染
VXETable.renderer.add('date', {
  // 项内容模板
  renderItemContent(h, renderOpts, { data, property }) {
    console.log(data, property)
    return [
      <vxe-input v-model={data[property]} placeholder="日期选择" type="date"></vxe-input>
    ]
  }
})
VXETable.renderer.add('dateMonth', {
  // 项内容模板
  renderItemContent(h, renderOpts, { data, property }) {
    console.log(data, property)
    return [
      <vxe-input v-model={data[property]} placeholder="日期选择" type="month"></vxe-input>
    ]
  }
})
// 创建一个简单的表单-输入框渲染
VXETable.renderer.add('reportType', {
  renderCell(h, renderOpts, { row, column }) {
    console.log(row)
    // const button = getStatusButton(1)
    // console.log(button)
    console.log(row[column.property])
    return [
      function getTag(status) {
        if (status == 'hit') {
          return <el-tag type="danger" style="height:30px;width:40px;">HIT</el-tag>
        } else {
          return <el-tag type="success" style="height:30px;width:60px">NO HIT</el-tag>
        }
      }(row[column.property])

    ]
  },
  // 项内容模板
  renderItemContent(h, renderOpts, { data, property }) {
    console.log(data[property])
    return [
      function getTag(status) {
        if (status == 'hit') {
          return <el-tag type="danger" style="height:30px;width:40px;">HIT</el-tag>
        } else {
          return <el-tag type="success" style="height:30px;width:60px">NO HIT</el-tag>
        }
      }(data[property])

    ]
  }
})

VXETable.renderer.add('status', {
  // 可编辑显示模板
  renderCell(h, renderOpts, { row, column }) {
    // const button = getStatusButton(1)
    // console.log(button)

    return [
      function getStatusButton(status) {
        if (status == 'ESCALATE') {
          return <el-tag content="Pending" style="height:35px;width:70px">ESCALATE</el-tag>
        } else if (status == 'PASS') {
          return <el-tag type="success" style="height:35px;width:70px">PASS</el-tag>
        } else if (status == 'PENDING') {
          return <el-tag type="info" style="height:35px;width:70px">PENDING</el-tag>
        } else if (status == 'HOLD') {
          return <el-tag type="warning" style="height:35px;width:70px">HOLD</el-tag>
        } else if (status == 'REJECT') {
          return <el-tag type="danger" style="height:35px;width:70px">REJECT</el-tag>
        }
      }(row[column.property])
    ]
  }
})

VXETable.renderer.add('boxStatus', {
  // 可编辑激活模板
  renderEdit(h, renderOpts, { row, column }) {
    return [
      <vxe-switch v-model={row[column.property]} open-label="开箱" open-value="Open" close-label="关箱" close-value="Close"
      ></vxe-switch>
    ]
  },
  // 可编辑显示模板
  // renderCell(h, renderOpts, { row, column }) {
  //   console.log(row[column.property],row)
  //   return [
  //     <vxe-switch v-model={row[column.property]}  open-label='开箱' open-value='Open' close-label='关箱' close-value='Close'></vxe-switch>
  //   ]
  // },
  // 导出模板，例如导出插槽中自定义的内容
  exportMethod(params) {
    const { row, column } = params
    return '自定义内容'
  }
})
VXETable.renderer.add('labelSelect', {
  // 可编辑激活模板
  renderEdit(h, renderOpts, { row, column }) {
    return [
      <vxe-select v-model={row[column.property]}>
        <vxe-option label="收单" value="收单"></vxe-option>
        <vxe-option label="装箱" value="装箱"></vxe-option>
      </vxe-select>
    ]
  },
  // 可编辑显示模板
  renderCell(h, renderOpts, { row, column }) {
    return [
      <span>{row[column.property]}</span>
    ]
  },
  // 导出模板，例如导出插槽中自定义的内容
  exportMethod(params) {
    const { row, column } = params
    return '自定义内容'
  }
})
VXETable.renderer.add('sourceSelect', {
  // 可编辑激活模板
  renderEdit(h, renderOpts, { row, column }) {
    return [
      <vxe-select v-model={row[column.property]}>
        <vxe-option label="金蝶" value="金蝶"></vxe-option>
      </vxe-select>
    ]
  },
  // 可编辑显示模板
  renderCell(h, renderOpts, { row, column }) {
    return [
      <span>{row[column.property]}</span>
    ]
  },
  // 导出模板，例如导出插槽中自定义的内容
  exportMethod(params) {
    const { row, column } = params
    return '自定义内容'
  }
})
VXETable.renderer.add('deliverStatus', {

  // 可编辑激活模板
  renderEdit(h, renderOpts, { row, column }) {
    console.log(row, column.property)
    return [
      <vxe-switch v-model={row[column.property]} onChange={e => change(e)} open-label="存储" open-value="save"
                  close-label="外运" close-value="outward"
      ></vxe-switch>
    ]
  },
  // // 可编辑显示模板
  // renderCell(h, renderOpts, { row, column }) {
  //   return [
  //     <vxe-switch v-model={row[column.property]} open-label='存储' open-value='save' close-label='外运' close-value='outward'></vxe-switch>
  //   ]
  // },
  // 导出模板，例如导出插槽中自定义的内容
  exportMethod(params) {
    const { row, column } = params
    return '自定义内容'
  }

})
VXETable.renderer.add('aiStatus', {
  // 可编辑显示模板
  renderCell(h, renderOpts, { row, column }) {
    console.log(row)
    // const button = getStatusButton(1)
    // console.log(button)
    console.log(row[column.property])
    return [
      function getStatusButton(aiStatus) {
        if (aiStatus == 'in_review') {
          return <el-tag content="Pending" style="height:35px;width:40px" class="el-icon-time"></el-tag>
        } else if (aiStatus == 'review_finish') {
          return <el-tag type="success" style="height:35px;width:40px" class="el-icon-circle-check"></el-tag>
        } else if (aiStatus == 'failed_to_submit_ai_audit') {
          return <el-tag type="danger" style="height:35px;width:40px" class="el-icon-circle-close"></el-tag>
        }
      }(row[column.property])
    ]
  }
})
export default VXETable
