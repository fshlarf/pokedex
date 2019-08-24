import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import './DashboardStyle.scss'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return  (
      <div className="container">
        <Card/>
      </div>
    )
  }
}

export default Dashboard