import {blurFn} from '@/render/handleFormEvent'
export default [
  /*{
  field: 'name',//表单字段名
  title: 'title',//标题
  span: 12,//表格宽度
  width: 100,//字段宽度
  itemRender: { name: '$input', props: { placeholder: '请输入名称' } }//输入方式
  },*/
 

  {
    field: 'aa',
    title: '客户名称',
    span: 24,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '请输入'
      }
    }
  },
  {
    field: 'bb',
    title: '项目名称',
    span: 24,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '请输入',
      },
      events:{
         blur:blurFn
      }
    }
  },
  {
    field: 'cc',
    title: '客户姓名',
    span: 24,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '请输入',
      },
    }
  },
  {
    field: 'dd',
    title: '项目经理',
    span: 12,
    span: 24,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '请输入名称项目经理（选填）'
      }
    }
  },
  {
    field: 'ee',
    title: '经理编码',
    span: 12,
    span: 24,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '请输入名称员工编码（选填）'
      }
    }
  },
 
  {
    align: 'center',
    span: 24,
    titleAlign: 'left',
    itemRender: {
      name: '$buttons',
      children: [{
        props: {
          type: 'submit',
          content: '确定',
          status: 'primary'
        }
      }, ]
    }
  }

]




 