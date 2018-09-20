import React from 'react'
import App from './app'
import { router as routerConfig } from './pages'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

function onChangeRoute(prevState, nextState, replace){
      // console.log("@@@@@@@", nextState)
}


export function getRouters(history) {
 
  let routeList = routerConfig.map((item, index) => <Route path={ item.url } key={index} component={ item.component }/>)

  return (
    <Router history={history}>
      <Route exact path="/" component={App} onChange={onChangeRoute.bind(this)}>
        { routeList }
      </Route>
    </Router>
  )
}
