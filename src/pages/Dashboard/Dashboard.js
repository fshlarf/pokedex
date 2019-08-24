import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import './DashboardStyle.scss'
import http from '../../services/http'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.fetchData()
  }
  fetchData = async () => {
    const res = await http.get('/')
    console.log(res);
    
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