import React, { Component, PropTypes } from 'react'
import { Layout, Icon, Menu, Dropdown } from 'antd'
import './index.less'

const { Header } = Layout

export default class extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		let userName = (window.$config && $config.userName) || '上帝';
		const menu = (
			<Menu>
				<Menu.Item>
					<a target="_blank" rel="noopener noreferrer" href="https://github.com/alphawq/webpack-4_demo">退出</a>
				</Menu.Item>
			</Menu>
		)
		return (
			<Header className="monitor-header" style={{background: '#ffffff', textAlign: 'right'}}>
				<Dropdown overlay={menu}>
					<a className="ant-dropdown-link" href="#" style={{color: '#333333'}}>
						你好 {userName}<Icon type="down" />
					</a>
				</Dropdown>
			</Header>
		)
	}
}
