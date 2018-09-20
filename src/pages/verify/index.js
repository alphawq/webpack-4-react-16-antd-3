import React, { Component } from 'react'
import './index.less'
import { Steps } from 'antd'
const { Step } = Steps

export default class extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <h2>Verify</h2>
        <Steps current={1}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
      </div>
    )
  }
}
