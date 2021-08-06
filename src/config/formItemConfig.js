// 字段配置信息
import {flatten} from "@/utils/index"

const files = require.context("@/config",true,/\.form\.js$/)
let formFields = files.keys().map(key=>{
    const field= require('@/config' + key.replace('.', ''));

    return field.default;
})
    
formFields = flatten(formFields)

export const formItemConfig = [
    // 模块部分
    {
        title: '基本信息',
        plate:"basic",
        span: 24,
        titleAlign: 'left',
        titleWidth: 200,
        titlePrefix: { icon: 'fa fa-address-card-o' }
    },
    {
        title: '额外信息',
        plate:"other",
        span: 24,
        titleAlign: 'left',
        titleWidth: 200,
        titlePrefix: { icon: 'fa fa-address-card-o' }
    },
    ...formFields, 
    {
        align: 'center',
        span: 24,
        titleAlign: 'left',
        itemRender: {
            name: '$buttons',
            children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, {
                props: {
                    type: 'reset',
                    content: '重置'
                }
            }]
        }
    }
]

export const formMethods={
    getFields(fields,formItemConfig){
        let arr=[]
         fields.forEach(item=>{
            formItemConfig.forEach(ite=>{
            if(ite.plate==item){
                arr.push(ite)
            }    
             if(ite.field==item){
                arr.push(ite)
             }
           })
        })
        arr.push(formItemConfig[formItemConfig.length-1])
        return arr
    }
}