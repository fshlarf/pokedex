import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import './DashboardStyle.scss'
import http from '../../services/http'
import { connect } from 'react-redux'
import { getData } from '../../redux/actions'

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
        <h2 className="dashboard__heading" onClick={this.props.getData}>POKEDEX</h2>
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

const mapStateToProps = (state) => {
  return {
    pokeData: state.pokeData
  }
}

const mapDispatchToProps  = dispatch => ({
  getData: () => {dispatch(getData())}
})

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)