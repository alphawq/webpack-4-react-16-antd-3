import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout, Menu, Icon } from 'antd'

import './index.less'

const { Sider } = Layout;
const { SubMenu} = Menu

export default class extends Component{
	constructor(props) {
		super(props);
		this.state = {
			defaultOpenedMenus: [],
			collapsed: false
		}
	}

	componentDidMount() {
		let { location } = this.props;
		let { pathname } = location;
		let paths = pathname.split("/").slice(1, -1);
		let defaultOpenedMenus = paths.reduce((prev, cur, index) => {
			const temp = prev[index-1] || ''
			prev.push(`${temp}/${cur}`)
			return prev
		}, [])
		this.setState({defaultOpenedMenus})
	}

	getNav(list, path=''){
		let ret = [];
		for(let item of list){
			let url = `${path}/${item.name}`;
			if(!item.children || !item.children.length){
				ret.push(
					<Menu.Item key={url} title={item.cname}>
						{item.icon ? <Icon type={item.icon} /> : null}
						{/* 不用span包裹，收起时文案不消失 */}
						<span style={{display: 'inline-block', width: '100%'}}>
							<Link className="nav-menu-link" to={url}>{item.cname}</Link>
						</span>
					</Menu.Item>)
			} else {
				ret.push(<SubMenu key={url} title={<span><Icon type={item.icon} /><span>{item.cname}</span></span>} >{this.getNav(item.children, url)}</SubMenu>)
			}
		}
		return ret;
	}

	onClick(item){
		localStorage.setItem("key", item.key);
	}

	onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

	render() {
		let { list, location } = this.props
		let path = location.pathname
		let { defaultOpenedMenus, collapsed } = this.state
		
		return (
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={this.onCollapse}>
				<Link to='/'>
					<div className="logo" style={{height: 60}} />
				</Link>
				<Menu
					mode="inline"
					theme="dark"
					key={`menu-${list && list.length}`}
					defaultSelectedKeys={[path]}
					defaultOpenKeys={defaultOpenedMenus}
					onClick={this.onClick.bind(this)}>
					{ this.getNav(list) }
				</Menu>
			</Sider>
		)
	}
}
