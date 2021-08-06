import request from '@/utils/request'

// 字段配置信息
// 动态加载字段配置信息
export function getList(url,params) {
    return request({
      url: url,
      method: 'get',
      params
    })
  }
const files = require.context("@/api",true,/\.api\.js$/)
const apis = {}
files.keys().forEach(key=>{

    const api= require('@/api' + key.replace('.', ''));

    Object.assign(apis,api)
    // return field.default;
})
export default {
     ...apis
}
// console.log(apis)