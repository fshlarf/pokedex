import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import './DashboardStyle.scss'
import { connect } from 'react-redux'
import { storeData } from '../../redux/actions'
import http from './../../services/http'
import PokeBall from './../../assets/img/pokeball.jpg'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextAPI: '',
      pokeResults: [],
      pokeResultBinds: [],
      offset: 0,
      limit: 100,
      isLoading: true,
      current: 12
    }
  }
  componentDidMount() {
    this.fethData()
  }
  fethData = async () => {
    const { nextAPI, offset, limit } = this.state
    let baseAPI = ''
    nextAPI !== '' ? baseAPI = nextAPI : baseAPI = 'https://pokeapi.co/api/v2/pokemon/?offset=' + offset + '&limit=' + limit
    const res = await http.get(baseAPI)
    this.setState({ 
      pokeResults: [...this.state.pokeResults, ...res.data.results],
      nextAPI: res.data.next
    })
    this.setState({ isLoading: false })
    this.state.pokeResults.map((item) => {
      if (this.state.pokeResultBinds.length < 12) {
        this.setState({ pokeResultBinds: [...this.state.pokeResultBinds, item] })
      }
    })
    if (res.data.next === null) {
      this.props.storeData(this.state.pokeResults)
      return
    }
    this.fethData()    
  }
  loadMore = () => {
    let oldCurrent = this.state.current
    this.setState({
      current: this.state.current + 12
    })
    setTimeout(() => {
      for (let i = oldCurrent; i <=  this.state.current - 1; i++) {
        this.setState({ pokeResultBinds: [...this.state.pokeResultBinds, this.state.pokeResults[i]] })
      }
    }, 100);
  }
  render() { 
    const CardPoke = this.state.pokeResultBinds.map((e, index)=> {
      return <Card key={index} url={e.url}/>
    })
    return  (
      <div className="dashboard">
        <h2 className="dashboard__heading" onClick={() => console.log(this.state.pokeResultBinds)}>POKEDEX</h2>
        { this.state.isLoading ? 
          ( <div className="dashboard__loader">
              <img src={PokeBall}/>
              <h5>Please wait...</h5>
            </div>) 
          : (
            <div>
              <div className="dashboard__content">
                {CardPoke}
              </div>
              <div className="dashboard__containerBtn">
                <button className="dashboard__btn" onClick={this.loadMore}>Load More Pokémon</button>
              </div>
            </div>
          ) }
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
  storeData: (payload) => {dispatch(storeData(payload))}
})

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)