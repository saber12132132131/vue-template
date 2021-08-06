[TOC]

### 项目梳理

#### 项目名称：vue-admin



#### 运行条件

```
安装依赖：npm install
本地开发 启动项目：npm run dev
```



#### 技术架构

```
😄Element UI & 🤭axios & 🙂vue-router & 😊vuex 
```



#### 目录结构

```bash
├── build                                               -------------------    # 构建相关
├── mock                                                -------------------    # 项目mock 模拟数据
├── public                                              -------------------    # 静态资源
│   │── logo.ico                                        -------------------    # 页面titile icon,配置在index.html
│   └── index.html                                      -------------------    # html模板
├── src                                                 ---------------    # 源代码
│   ├── api                                             -------------------    # 所有请求文件
│		│── xxx.api.js                                  ---------------    # 单个请求文件
│   	└── index.js                                    ---------------    # 请求集合，挂载到vue中
│   ├── assets                                          ---------------    # 主题 字体等静态资源
│   ├── components                                      ---------------    # 全局公用组件
│   ├── configs                                         ---------------    # 表格配置等 
│   ├── echartConfig                                    ---------------    # echarts图表等
│   ├── icons                                           ---------------    # 项目所有 svg icons 
│   ├── lang                                            ---------------    # 国际化 language
│   ├── layout                                          ---------------    # 全局 layout
│   ├── router                                          ---------------    # 路由
│   ├── render                                          ---------------    # 渲染器相关文件
│       ├── index.js                                    ---------------    # VXE渲染器注册文件
│       ├── handleFormEvent.js                          ---------------    # form表单注册事件
│   ├── store                                           ---------------    # vuex状态管理
│   ├── styles                                          ---------------    # 全局样式
│		│── xxx.css		                                ---------------    # 模块样式
│   	└── index.scss                                  ---------------    # 样式集合，挂载到vue中
│   ├── utils                                           ---------------    # 全局公用方法
│   ├── views                                           ---------------    # 所有页面
│		│── dashboard	                                ---------------    # 首页
│   	└── login                                       ---------------    # 登录
│   	└── permission                                  ---------------    # 权限模块
│   ├── settings.js                                     ---------------    # 项目配置,可更改页面title
│   ├── App.vue                                         ---------------    # 入口页面
│   ├── main.js                                         ---------------    # 入口文件 加载组件 初始化等
│   └── permission.js                                   ---------------    # 权限管理（登录的校验和登录后的路由跳转）    
├── tests                                               ---------------    # 测试
├── .env.development                                    ---------------    # 开发环境变量配置
├── .env.production                                     ---------------    # 生产环境变量配置
├── .env.staging                                        ---------------    # 测试环境变量配置
├── .eslintrc.js                                        ---------------    # eslint 配置项
├── .babelrc                                            ---------------    # babel-loader 配置
├── .travis.yml                                         ---------------    # 自动化CI配置
├── vue.config.js                                       ---------------    # vue-cli 配置
├── postcss.config.js                                   ---------------    # postcss 配置
├── package.json                                        ---------------    # 依赖包
├── .gitignore                                          ---------------    # 配置git管理忽略文件
├── .travis.yml                                         ---------------    # travis配置文件,代码提交后自动构建
├── .babel.config.js                                    ---------------    # babel语法编译   
└── postcss.config.js                                   ---------------    # CSS预处理器
```                                                 



#### 参考文档

```
vue-element-admin文档 ： https://panjiachen.github.io/vue-element-admin-site/zh/guide/ 

vxe-table文档：https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install
```

#### 相关命令（路由可手动添加）

```
配置表格字段：                                 gfc addConfig xxx   对应路径：src>config>xxx
删除config中xxx文件：                          gfc delConfig xxx
接口集成                                       gfc genApi -url 接口地址 -no  (导入导出下载自己手动生成)
添加一级路由  src>views>文件夹名称              gfc addview 文件夹名称 
二级路由                                       gfc addCview 文件名 -pr 文件夹名  -dist src/views/文件夹名/文件名

```