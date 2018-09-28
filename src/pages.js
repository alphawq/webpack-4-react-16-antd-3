import React, { Component } from 'react'
import Loadable from 'react-loadable'
import { Spin, Icon } from 'antd'

class DefaultContent extends Component { 
  render() { 
    return <div className="monitor-loaded-err-content"><Icon type="close" />加载失败...</div>
  }
}

// const loadable = (loader) => { 
//   return Loadable({
//     loader: () => {
//       return new Promise((resolve, reject) => { 
//         return setTimeout(() => { 
//           loader.then(res => { 
//             return resolve(loader)
//           }).catch(err => { 
//             resolve(DefaultContent)
//             console.error(`[ContentLoadedErr]：${err}`)
//           })
//         }, 300)
//       })
//     },
//     loading: () => <div className="monitor-content-loading"><Spin tip="加载中..." size="large"/></div>
//   })
// }
// const Verify = loadable(import(/* webpackChunkName: "Verify" */ 'pages/verify/index.js'))
// const Watch = loadable(import(/* webpackChunkName: "Watch" */ 'pages/watch/index.js'))

const Verify = Loadable({
  loader: ()=> import(/* webpackChunkName: "Verify" */ 'pages/verify/index.js'),
  loading: () => <div className="monitor-content-loading"><Spin tip="加载中..." size="large"/></div>
})
const Watch = Loadable({
  loader: () => import(/* webpackChunkName: "Watch" */ 'pages/watch/index.js'),
  loading: () => <div className="monitor-content-loading"><Spin tip="加载中..." size="large"/></div>
})

const config = [{
  title: '房源审核池',
  url: 'quality/verify',
  component: Verify
}, {
  title: '',
  url: "quality/watch",
  component: Watch
}]

const router = config.map(item => ({
  url: item.url,
  component: item.component
}))

export {
  router
}