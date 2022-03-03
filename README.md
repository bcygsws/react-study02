## 项目构建

## 项目 webpack-senior 已经完成了 bable 和 webpack 的配置，相关插件和配置文件复用

### 装 react 相关包

-   两个基本的包 react、react-dom

### 更进一步，字面量的方式写尖括号，创建 html 代码片段（类似组件）

-   需要安装插件，@babel/preset-react 包来解析这种尖括号语法
-   插件还需要引入到.babelrc 配置文件中

## 项目运行

-   $ npm run dev

## React 框架中创建组件的四种方式（一步步进化）

-   React.createElement(标签,{属性 1：值 1，属性 2，值 2}||null,子元素或子节点)
-   使用 jsx 语法，字面量的方式创建。var Hello=\<div\>\<\/div\>
-   使用 jsx 语法，function 函数创建
-   使用 jsx 语法，class 创建

### 相关安装包说明

-   上面这四种创建组件的方式，都需要导入 react 包，import React from 'react';
-   组件的渲染和 dom 相关的操作，用到 react-dom 包，在 main.js 中导入
-   使用函数和 class 类创建组件是常用方式，这两种方式都用到了 jsx 尖括号语法，需要一个新的包@babel/preset-react 来转换。安装这个包，并且在 babelrc.配置文件的 presets 节点中声明

### 组件属性的获取和两种组件的使用场景

#### 组件属性

-   function 组件，接收父组件或其他组件传递过来的属性，需要在 function 函数中引入一个参数 props,【props.属性名】获取属性值。并且属性值是只读的
-   class 组件中，属性值的获取需要分开讨论：

1.  构造函数中要获取属性值，需要在构造函数中声明 props 参数，可以获取参数值；
2.  render 函数中要获取属性值，this.props 即可，且这种方式不依赖有没有定义构造函数
3.  类中其他方法，比如事件处理函数中，this.setState(function(preVal,props){}[,callback])。

-   setState 的函数参数的两个参数 preVal 和 props
-   其中 preVal 可以自定义名称，表示的是被改变前的 state 里面的对象值
-   props 表示父组件或其他组件传递过来的属性

#### 使用场合

-   function 组件中接收 props 属性是只读的，没有 state 数据，这种组件叫做无状态组件
-   class 组件中 props 属性也是只读的，但是该组件可以定义自己的私有数据，私有数据 state 是可读可写的，这种组件是有状态组件
-   无状态组件没有自己的生命组件，有状态组件有自己的生命周期

##### 使用

-   如果一个组件要存放自己的私有数据，或在组件的不同阶段执行不同的业务逻辑，此时非常适合使用有状态组件；
-   如果一个组件只需要接收数据，并随之渲染组件，最好使用无状态组件，function 组件由于没有生命周期，运行速度要稍微快一些

## 不同 jsx 文件样式的隔离

-   方式一：main.js 文件中直接 import '样式文件路径'，得实时关注各个 jsx 文件定义的类名，不要重复。重复类名，可能造成样式的混乱
-   方式二：let obj={margin:10px 0,color:pink} <div style={obj}>;这种方式会定义很多的对象，虽然可以模块的形式导出，但样式的抽取、打包不方便
-   方式三：
    1. 在 css 目录下定义样式文件，文件命名要和组件有一定的关联，以便于查找
    2. 在 webpack.config.js（或 webpack.pub.config.js）中为 css-loader 配置开启模块化（modules:true;），并重定义类名的规范（localIdentName:'[local]--[hash:base64:5]'）
    3. 在需要样式文件的 jsx 文件中，import ObjStyle form '样式文件路径'；
    4. 将类名修正。例如：原来是\<div className="user"\>\</div\>变更为\<div className={ObjStyle.use}\>\<\/div\>

## React 组件的生命周期

