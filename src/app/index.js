import React, { Component } from 'react'
import { Layout } from 'antd';
import Navs from './nav'
import Headers from './header'
import 'static/css/common.less'

const { Content } = Layout;

export default class Sider extends Component {
  state = {
		menus: [{
			"icon": "pie-chart",
			"cname": "房源审核池",
			"id": "1",
			"name": "quality/verify"
		}, {
			"icon": "bars",
			"cname": "运营活动",
			"id": "2",
			"name": "quality",
			"children": [{
				"icon": "",
				"cname": "核心指标",
				"id": "2-1",
				"name": "watch"
			}]
		}]
  }

	render() {
		const { menus } = this.state
		let { location, children } = this.props;
    return (<Layout style={{ minHeight: '100vh' }}>
        <Navs location={location} list={menus} />
				<Layout>
					<Headers />
          <Content style={{ margin: '0 16px' }}>
						<div className="react-content">{children}</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
