// 扁平化数组
import {flatten} from "@/utils/index"

// 字段配置信息
// 动态加载字段配置信息

const files = require.context("@/config",true,/\.field\.js$/)
const fields = files.keys().map(key=>{
    const field= require('@/config' + key.replace('.', ''));

    return field.default;
})

 const filedConfig = flatten(fields)

const fieldMethods={
    getFields(fields,filedConfig){
        let arr=[]
         fields.forEach(item=>{
            filedConfig.forEach(ite=>{
            if(ite.plate==item){
                arr.push(ite)
            }
             if(ite.field==item){
                arr.push(ite)
             }
           })
        })

        return arr
    }
}
export{
    filedConfig,
    fieldMethods
}
