# 1.2023/01/06

## 1.1 初始化项目结构

### 1.2 css 库(styled-components)

#### 1.2.1 依赖安装 npm i styled-components & npm i -D @types/styled-components

#### 1.2.2 reset-css 使用 https://www.joshwcomeau.com/css/custom-css-reset/ src/style.ts

#### 1.2.3 在 App.ts 导入全局样式并测试效果

### 1.3 路由

#### 1.3.1 安装依赖 npm install react-router react-router-dom

#### 1.3.2 分别创建 Home Recommend Singers Rank 页面作为 Route 测试依赖

- 路径依次为 src/application/Home/index.ts, src/application/Recommend/index.ts, src/application/Singers/index.ts, src/application/Rank/index.ts
- src/routes/index.tsx 填写 route 配置
- src/index.tsx 配置外层 context

## 1.4 导航栏的开发

# 2. 2023/01/07

## 数据流

1. 安装 npm install @reduxjs/toolkit react-redux 并配置好文件结构

## 组件

### swiper 组件

#### 轮播组件开发 src\components\slider\index.tsx

#### 推荐列表开发

### 滚动组件

## 网络请求并且通过 redux 连入数据

## 实现懒加载图片组件，使用方案来自https://blog.renwangyu.com/2022/01/28/react-suspense-lazy-img/

### TODO: 实现视口之外的图片懒加载

## 进场 loading 效果

### 细节改动 防止重复请求 (目前的方案偏差 TODO)

### 横向滚动列表(歌手的分类)

#### 实现横向滚动效果

#### 添加点击样式

### 歌手详情的 list 实现，数据 mock

#### 接口的 api 变化，调整参数结构

#### 使用 redux-toolkit 完成歌手列表页

#### 添加上下 loading 的动画以及 author 的 image 懒加载

#### 基于 axios 实现防抖，方案来自 https://juejin.cn/post/6968630178163458084#heading-10

- FIXME: 在 singer 列表页面，下拉会触发多次更新,可以去 redux-toolkit 看看有没有合适的方案

#### 将歌手类型 地区 首字母纳入 redux 的管理

- TODO: singer 列表页面上拉刷新的 loading 效果延迟消失

## Rank 页面开发

### 1. 准备数据层的文件

### 2. 完成 Rank 数据的渲染

## recommend 详情页面的开发

## 动画相关

- 依赖安装 npm install react-transition-group
- npm i --save-dev @types/react-transition-group

### 进入歌单详情页的 mock 数据页面

### 添加滚动歌单详情时的走马灯的效果

### 真实数据替换 mock 数据，完成歌单详情页

### 轻量化组件

## 复用组件开发 排行榜单详情页面

# 3. 2023/01/08

## 歌手详情页面

- 修补动画效果 translate3d 的使用，css 中使用函数中间不能有空格

- 添加滚动缩放的效果

- 修复进入singer详情页的id参数问题

- 使用真实数据替换mock

- 修复service传参错误，导致key失效
