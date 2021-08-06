import api from '@/api'


export function search({
  data,
  property,
  $form
}) {
  console.log(data, property, $form)
  const params = {
    key: data[property].trim()
  }
  if (params != '') {
    api.queryStaffInfo(params).then((res) => {
      console.log(res)
      let obj = {}
      const result = res.data || {}
      for (const item in data) {
        obj[item] = data[item]
      }
      obj.name = res.data ? res.data.name : null
      obj.mudId = res.data ? res.data.mudId : null
      // obj.bu = res.data ? res.data.bu : null
      obj.ta = res.data ? res.data.ta : null
      obj.personaMail = res.data ? res.data.personaMail : null
      obj.invoiceNo = res.data ? res.data.invoiceNumber : null
      obj.invoiceTitle = res.data ? res.data.invoiceTitle : null
      obj.leader = res.data ? res.data.managerName : null
      obj.personaMail = res.data ? res.data.email : null
      // // obj={...obj,...data.data}
      $form.$parent.$parent.formData = obj
      //  Reflect.set($form.$parent.$parent, 'data', obj)
      // console.log($form, obj)
    })
  }
}

export function searchBU({
  data,
  property,
  $form
}) {
  console.log(data, property, $form)
  const params = {
    key: data[property].trim()
  }
  if (params != '') {
    api.getBoxList(params).then((res) => {
      console.log(res)
      if (res.data.length == 1) {
        let obj = {}
        const result = res.data || {}
        for (const item in data) {
          obj[item] = data[item]
        }
        obj.bu = res.data ? res.data[0].bu : null
        obj.companyCode = res.data ? res.data[0].buCompanyCode : null
        $form.$parent.$parent.formData = obj
        // obj={...obj,...data.data}
      }

      //  Reflect.set($form.$parent.$parent, 'data', obj)
      // console.log($form, obj)
    })
  }
}

export function reportSearch({
  data,
  property,
  $form
}) {
  const params = {
    reportKey: data[property].trim()
  }
  if (params != '') {
    api.getReport(params).then((res) => {
      if (res.data) {
        let obj = {}
        const result = res.data || {}
        for (const item in data) {
          obj[item] = data[item]
        }
        obj.reportKey = result.reportKey
        obj.employeeId = result.employeeId
        obj.name = result.name
        obj.mudId = result.mudId
        obj.company = result.company
        obj.companyCode = result.companyCode
        obj.ta = result.ta
        obj.bu = result.bu
        $form.$parent.$parent.formData = obj
      }

    })
  }
}

//失去焦点事件
export function blurFn({data,property,$form}) {
  console.log(data,property,$form)
}
