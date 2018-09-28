import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { getRouters } from './router'

render(getRouters(browserHistory), document.getElementById('root'))