import React, { forwardRef } from 'react';
import MyGrand from './MyGrand.jsx';
const MySon = (props, ref) => {
	return (
		<div>
			<h4>这是儿子组件</h4>
			<MyGrand ref={ref}></MyGrand>
		</div>
	);
};
export default forwardRef(MySon);
