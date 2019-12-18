import React, { Component } from 'react'
import { $post } from '../../api'

class Test extends Component {
  state = {
    payload: null,
    errMsg: ''
  }

  fetchTest = async () => {
    const params = {
      foo: 1,
      bar: 2,
      baz: 3
    }
    try {
      const {data} = await $post('test', params)
      const {result, payload, errMsg} = data
      if (result === '01') {
        this.setState({
          payload,
          errMsg
        })
      } else {
        this.setState({
          payload,
          errMsg
        })
      }
    } catch(e) {
      this.setState({
        payload: null,
        errMsg: e.message
      })
    }
  }

  render() {
    const {
      payload,
      errMsg
    } = this.state
    return (
      <div>
        <p>payload: {JSON.stringify(payload)}</p>
        <p>errMsg: {errMsg}</p>
        <button onClick={this.fetchTest}>fetch</button>
      </div>
    )
  }
}

export default Test