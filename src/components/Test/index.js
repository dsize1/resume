import React, { Component } from 'react'
import { $post } from '../../api'

class Test extends Component {
  state = {
    payload: null,
    errMsg: '',
  }

  fetchTest = async () => {
    if (this.isFetching) {
      return
    }
    const date = new Date()
    console.log(date)
    const params = {
      date
    }
    try {
      this.isFetching = true
      const resp = await $post('test', params, true)
      this.isFetching = false
      const {result, payload, errMsg} = resp.data
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
      this.isFetching = false
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