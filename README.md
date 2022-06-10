L## 一、项目构建

## 二、项目 webpack-senior 已经完成了 bable 和 webpack 的配置，相关插件和配置文件复用

### 装 react 相关包

-   两个基本的包 react、react-dom

### 更进一步，字面量的方式写尖括号，创建 html 代码片段（类似组件）

-   需要安装插件，@babel/preset-react 包来解析这种尖括号语法
-   插件还需要引入到.babelrc 配置文件中

## 三、项目运行

-   $ npm run dev

## 四、React 框架中创建组件的四种方式（一步步进化）

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

## 五、同 jsx 文件样式的隔离

-   方式一：main.js 文件中直接 import '样式文件路径'，得实时关注各个 jsx 文件定义的类名，不要重复。重复类名，可能造成样式的混乱
-   方式二：let obj={margin:10px 0,color:pink} \<div style={obj}\>;这种方式会定义很多的对象，虽然可以模块的形式导出，但样式的抽取、打包不方便
-   方式三：
    1. 在 css 目录下定义样式文件，文件命名要和组件有一定的关联，以便于查找
    2. 在 webpack.config.js（或 webpack.pub.config.js）中为 css-loader 配置开启模块化（modules:true;），并重定义类名的规范（localIdentName:'[local]--[hash:base64:5]'）
    3. 在需要样式文件的 jsx 文件中，import ObjStyle form '样式文件路径'；
    4. 将类名修正。例如：原来是\<div className="user"\>\</div\>变更为\<div className={ObjStyle.use}\>\<\/div\>

## 六、React 组件的生命周期

### React@16.3开始的版本，生命周期钩子的原来的名字要使用，前面需要加一个 UNSAFE\_前缀（举例：componentWillUpdate，应该写作 UNSAFE_componentWillUpdate），要不然控制台就会提示警告信息

### 在 React 属性，有一些属性必须传的。但是没有传，就会从默认属性 defaultProps 中获取这个【启动参数】

-   启动参数以静态变量的方式，在 class 类组件中定义；例如：static defaultProps={initVal:0}

### 对父组件或其他组件传递过来的属性，进行必要的类型校验,以确保当前组件拿到的是需要的数据类型

-   react@15.x版本以后，类型校验需要的包已经被单独封装成了一个包，prop-types，安装改包：$ npm i prop-types@15.7.2 --save-dev
-   在需要的组件中，导入一个对象；import ReactTypes from 'prop-types';
-   在类组件中同样定义一个静态变量，static propTypes={initVal:ReactTypes.number};

### 钩子 componentWillMount

-   含义：该阶段组件还没有开始挂载，也没有开始渲染虚拟 dom
-   整个生命周期阶段，只执行一次；可以调用 setState()方法，另外两个可以调用 setState 的钩子时 componentDidMount 和 componentWillReceiveProps
-   可以拿到 this.state、this.props 中的数据
-   可以调用自定义的函数
-   不能够操作 dom。原因；虚拟 dom 都还没有开始渲染，如果获取虚拟 dom 对象(document.getElementById('myVal'))，结果是 null

### render 函数渲染阶段

-   含义：开始渲染虚拟 dom，render 函数执行完成，虚拟 dom 就渲染完成了，生成了一个虚拟 dom 树
-   可以拿到数据，前面能够拿到的数据，也一样能拿到
-   在 return 语句之前，获取虚拟 dom，仍然是 null
-   render 函数调用次数是：大于等于 1 次。如果组件从渲染到销毁，没有触发属性或数据变化，就执行一次。一旦出现上述数据的变化，render 函数的执行次数，必然大于等于 2 次
-   注意：render 函数在组件创建阶段和组件运行阶段都有调用，而且调用的是同一个 render 函数，因此 render 函数的调用次数，是组件创建阶段和组件运行阶段的 render 调用次数，一起计算
-   render 阶段获取父组件或其他组件传递过来的属性值，直接使用 this.props.属性名就可以获取。这个 props 是固定写法，不依赖当前组件是否显式定义了构造函数，是否在构造函数中传递了参数

### 钩子 componentDidMount

-   含义：到该阶段虚拟 dom 已经创建完成，数据、虚拟 dom 和页面三者保持一致，数据已经渲染到页面上了
-   该钩子在整个生命周期中，只执行一次。在钩子内部可以调用 setState 方法

### 钩子 shouldComponentUpdate,有两个参数

-   组件是否需要更新，需要返回一个布尔值。true 表示组件需要在页面上更新，值为 false 组件不会在页面上更新了，该钩子后面的生命周期钩子也不会执行了
-   该钩子有两个参数 shouldComponentUpdate(nextProps,nextState),nextProps 中返回的是旧的属性值，nextState 中返回的是更新后的 state 对象值

### 钩子 componentWillUpdate,有两个参数

-   含义：组件即将重新挂载，还没有开始成重新渲染虚拟 dom
-   两个参数：nextProps 返回的是当前组件的属性变化前的对象，nextState 是数据更新后新的 state 对象,同 shouldComponentUpdate 中一样

### 钩子 render 函数

-   已经在前面做了说明

### 钩子 componentDidUpdate，有两个参数，prevProps,prevState;特殊：这两个参数都是变化前的对象，与前面一旧一新不同

-   含义：该阶段更新的数据、重新渲染的虚拟 dom 和更新的页面保持一致，改变的数据已经重新渲染到页面中了
-   prevProps 指 state 变化前传递的属性对象，prevState 指更新前的 state 对象

### 钩子 componentWillUnmount

-   含义：组件销毁阶段

### 钩子 componentWillReceiveProps,有一个参数，nextProps

-   父组件传递给子组件属性，只有当父组件中传递的这个值变化时，才触发这个钩子，结合 TestReceiveProps.jsx 案例理解
-   nextProps 中返回的是传递过来的变化后的对象，当前子组件的 this.props 打印的还是传递的旧对象
### React16 生命周期钩子

#### 关于 componentWillReceiveProps 生命周期钩子的说明

-   结合 TestReceiveProps.jsx 组件演示
-   回想 react 生命周期钩子流程图，在 react 中有两种方式引起组件更新；而 componentWillReceiveProps 是属性变化引起组件更新的处理钩子
-   属性变化将引起，componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render、componentDidUpdate 这五个钩子执行
-   在 componentWillReceiveProps 的唯一参数 nextProps 中，可以最早拿到父组件更新注入子组件的属性值 -但是，对于子组件对象中的 this.props，唯有到了更新渲染完成的阶段，即 componentDidUpdate 阶段，才能拿到更新后的 this.props 的新值
-   componentDidUpdated(){
-   console.log(this.props);// 只能在更新渲染完成的钩子中获得 this.props 最新值，前面的钩子中拿到的 this.props 的旧值
-   };

### React17 生命周期钩子

## 七、bind 绑定 this 参数并传值的三种方式

### 结合案例 ThisBind.jsx

### 三种方式

#### 1.在 render 函数调用处绑定

-   绑定处，onClick={this.firstHandle.bind(this[,arg1,arg2])}
-   接收处，事件处理函数写成普通函数就可以了

#### 2.在构造函数中绑定并赋值

-   绑定处， constructor(props){super(props); this.secondHandle=this.secondHandle.bind(this,arg1,arg2);}
-   接收处，secondHandle 写成普通函数就可以了

#### 3.使用箭头函数-要解决解析到调用处即执行的问题

-   绑定处，onClick={()=>this.secondHandle(arg1,arg1)};注意不能写成 onClick={this.thirdHandle(arg1,arg2)}这样编译器解析到此处时就会发现 this.thirdHandle()是一个箭头函数，而且立即调用。这不是预期的结果，onClick 事件的目的是人为地来触发，而不是让系统解析代码时触发
-   接收处，thirdHandle=(arg1,arg2)=>{console.log(this)}; 接收处写成箭头函数

### 辅助知识-bind 的三种用法，结合案例 bindUse.js 理解

#### 1.创建绑定函数，react 中前两种都是使用 bind 绑定 this 并传参

#### 2.偏函数，基本用途是为函数预设一个初始参数

#### 3.定时器修改 this 指向，setTimeout(function(){}.bind(this),1000)

## 八、子组件向父组件传值的两种方式

### 结合案例[父子组件之间的传值](https://blog.csdn.net/weixin_42881744/article/details/105706084)

### 父传给子组件

-   不用赘述，绑定属性，这个属性可以是变量，表达式值（如 initVal={0},也可以是函数名）

### 子组件向父组件传值的两种方式

## 九、Context 特性的使用方法

### 使用场景

-   祖父级组件给孙子组件传递一个属性，常规情况下，需要层层传递。祖父传给父组件，父组件才传递给子组件，这种方式将不需要接收数据的父组件也牵涉其中。更何苦，如果层级更深，这种传递灵活性低，而且代码冗余
-   为此，React 引入了 Context 特性来解决这个问题

### 使用步骤

1. 在需要发送数据的顶层组件，定义一个方法，getChildContext,该方法有返回值，返回一个对象，对象的键是要传递的属性的键。如：eturn {fontSize:this.state.fontSize}

2. 同样在该顶层组件中，进行一个数据校验，对要传递出去的数据进行校验，定义一个静态变量 static childContextTypes=fontSize:ReactTypes.number}

3. 在接收处组件，同样地对接收的数据进行类型校验，此时要定义的检验变量是 contextTypes。如：static contextTypes=fontSize:ReactTypes.number}

4. 在 render 函数或者其他位置，使用 this.context.键名来获取值。例如：this.context.fontSize

### 记忆方式+

-   getChildContextTypes,前三、后三、后二
-   一个方法，两个静态属性
-   在发送数据处，前三、后三，即：getChildContext 方法，childContextTypes 类型校验
-   在接收数据处，后二，contextTypes
-   然后，获取值使用，this.context.[键名]

## 十、react 的路由

### react-router-dom

-   {HashRouter,Link,NavLink,Route,Redirect,withRouter}按需导入
-   HashRouter 只出现一次，放在 App.jsx 的最外层，且只出现一次
-   Link 和 NavLink 相当于 vue 中 router-link,NavLink 是 Link 的特定版，有 activeStyle、activeClassName、isActive(f) 路由是否激活的额外业务逻辑
-   Route 有两个作用，一设定路由规则：完成路由地址和组件的匹配；还是一个占位符，相当于 vue 中的 router-view
-   Redirect 是路由重定向，是单标签\<Redirect from="/" to="/home" exact \/\>

### react 的四种路由参数

-   [参考文档](https://blog.csdn.net/glorydx/article/details/104769742)
-   [参考文档 1](https://www.cnblogs.com/huihuihero/p/12165344.html)

-   a. Route 中路由参数 params，\<Route path="/home/:type/:id" \/\>,进入的页面中 this.props.match.params.type、this.props.match.params.id
-   b. search 参数：\<Link to="/home?name=rx" \>\<\/Link\>，接收 this.props.location.search，拿到这个值是一个编码过的字符串。组件：UseQuery 中做了演示，?name='%E5%BC%A0%E4%B8%89'。参数会出现在地址栏，刷新页面后，参数保持
-   c.query 查询字符串，\<Link to={{pathname:'/home',query:{name'rx'}}} \>\<\/Link\> ，接收时 this.props.location.query 拿到的是一个对象{name:'张三'}，地址栏不会出现参数，刷新页面后参数消失
-   d. state 隐式传参，和 query 传参类似，传参不会出现在地址栏中，但是在 HashRouter 中刷新当前页面，参数会消失。对比之下，state 隐式传参时，传参的信息不会暴露在 url 中，更安全。缺点：在 HashRouter 中，刷新页面中参数消失，但是在 HistoryRouter 中参数不会消失
-   e. withRouter 高阶组件，将 history、location 和 match 三大对象，添加到 this.props 下

### react-native-router-flux,用于 RN 开发中的路由导航

#### Router 按需导入，类似 HashRouter，放在 Main.js 文件中的最外层

#### Router 下嵌套 Stack,Stack 用于为路由分组，不表示具体路由，常用属性 key="字符串"

#### Scene 类似 react-router-dom 中的 Route,有多个常用属性，key="movieitem" component={组件名称} title="电影详情" hideNavBar={true}

-   key 中的值用于编程式导航，Actions.movieitem(可以传参,如：{id:item.id})
-   title 一旦声明，就会在页面的顶部生成一个导航条，title 中的值是导航条名称，还自动有一个返回键
-   hideNavBar={true}可以隐藏导航条

## 十一、React 懒加载的实现：react-loadable 插件

### 基本使用

-   引入 react-loadable 插件，import Loadable from 'react-loadable';
-   定义一个 loadable.js 文件，参数里接收一个函数作为参数
-   export default (loader)=>{
-   return Loadable({
-   loader,
-   loading(){
-   return <div>加载中……</div>
-                                      }
-                                  })
-   }

### 定义一函数，模拟上面 export default 暴露的函数

#### 思想：定义一个高阶组件，在组件中使用文件的异步加载来模拟组件的 lan 加载

#### 具体实现：见本项目：utils/loadable.js 文件末尾

## 十二、解决 React 引入 Ant Design 导致 bundle 过大问题

### 使用场景

-   生产环境打包时，使用 webpack-bundle-analyzer 插件可视化分析时，一个较大的包，是由于 D:\Web-project\react-study02\node_modules\_@ant-design_icons@2.1.1@@ant-design\icons\lib 路径下的 dist.js 文件引起的，这个文件大小有 530kb,引起打包时 async-chunks 这个包过大

### 解决办法

-   仅使用于 ant-design3.x 版本，ant-design4.x 版本已经支持按需加载，不会出现这个问题
-   可视化插件分析时，很容易看到是全量引入了 矢量图标， SVG - ICONS
-   在 webpack.pub.config.js 文件中增加一级的 resolve 节点，配置一个别名 alias,@ant-design/icons/lib/dist 路径替换成自己在 utils 文件夹下创建的文件 icons.js
-   然后，运行$:npm run pub 打包，发现 async-chunks.js 文件果然减小到了 285kib，之前为 647kib，减小到了原来的 1/3

[参考文档](https://blog.csdn.net/u012392251/article/details/104951475)

## 十三、react 视频播放解决方案

### 方案一、video-react

-   [video-react 播放器](https://video-react.js.org/components/player/)

### 方案二、使用 JoL-player 插件

-   [视频演示-知乎地址](https://www.zhihu.com/zvideo/1413964811906981888)
-   [插件-github 地址](https://github.com/lgf196/JoL-player)

### 方案三、使用 react-player 插件，推荐

-   [react-player 插件，开发小院](http://www.voidcc.com/project/react-player)
-   [github 官网](https://github.com/cookpete/react-player)
