/**
 * 
 * @ 演示React16.4版本以后，getDerivedStateFromProps
 * 参考文档：
 * 简书：https://www.jianshu.com/p/26d7667f35ef
 * 
 * 
 * 
 */
import React from 'react';
import Fat from './Fat.jsx';
export default class NewCircle extends React.Component{
  render() {
    return<div>
      <h3>React16.4版本以后，生命周期钩子</h3>
      <Fat></Fat>
    </div>
  }
}