import React, { Component } from 'react';
/*
import { Route } from 'react-router-dom';
import Loading from '../components/Loading';
import Home from 'bundle-loader?lazy&name=home!../components/Home';

<Route component={newBundle(Home, Loading)} />
1. 在 Home 组件执行报错的时候整体页面依旧可以正常加载,只是切换到加载 Loading 组件
3. 经过 bundle-loader 的js会编译成一个独立的js文件进行按需加载,若页面不调用js将不加载
4. package.json 中需添加依赖 bundle-loader
5. 若不需要此功能其实可以不用此方法加载组件
6. 正常情况不使用 bundle-loader 加载,最后是一个js文件,使用之后变成多个js文件
*/
class Bundle extends Component {
	componentWillMount() {
		// short for "module" but that's a keyword in js, so "mod"
		this.state = { mod: null };
		this.load(this.props.callback);
	}
	componentWillReceiveProps = ({ callback }) =>
		this.props.callback !== callback && this.load(callback)
	load = callback => {
		this.setState({ mod: null });
		// handle both es imports and cjs
		callback(mod => this.setState({ mod: mod.default || mod }));
	}
	renderComponent = (ComponentWaiting, ComponentLoading, props = {}) =>
		ComponentWaiting ? <ComponentWaiting {...props} /> : <ComponentLoading {...props} />
	render() {
		const { loading, props } = this.props;
		const { mod } = this.state;
		return this.renderComponent(mod, loading, props);
	}
}
export const newBundle = ComponentLoading =>
	ComponentCallback =>
		props => <Bundle
			props={props}
			loading={ComponentLoading}
			callback={ComponentCallback}
		/>