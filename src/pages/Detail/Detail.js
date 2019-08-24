import React, { Component } from 'react'
import './DetailStyle.scss'

class Detail extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    
  }
  render() {
    return (
      <div>Hallo from Detail</div>
    )
  }
}

export default Detail