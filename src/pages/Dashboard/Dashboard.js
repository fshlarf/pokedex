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
    console.log(res.data);
    
  }
  render() {
    return  (
      <div>
        <h2 className="dashboard__heading">POKEDEX</h2>
        <div className="dashboard__content">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>




        </div>
      </div>
    )
  }
}

export default Dashboard