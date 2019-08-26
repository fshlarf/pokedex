import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import './DashboardStyle.scss'
import { connect } from 'react-redux'
import { storeData } from '../../redux/actions'
import http from './../../services/http'
import PokeBall from './../../assets/img/pokeball.jpg'
import ButtonFilter from './../../components/ButtonFilter/ButtonFilter'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextAPI: '',
      pokeResults: [],
      pokeResultsTemp: [],
      pokeResultBinds: [],
      offset: 0,
      limit: 100,
      isLoading: true,
      current: 12,
      titleBtn: 'Lowest Number (First)',
      showOption: false,
      highToLow: false,
      setAlphabet: false
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
    this.setState({ pokeResults: [...this.state.pokeResults, ...res.data.results], nextAPI: res.data.next })
    this.setState({ isLoading: false })
    this.state.pokeResults.map((item) => {
      if (this.state.pokeResultBinds.length < 12) {
        this.setState({ pokeResultBinds: [...this.state.pokeResultBinds, item] })
      }
    })
    if (res.data.next === null) {
      this.filterArray()
      return      
    }
    this.fethData()    
  }
  filterArray = () => {
    this.state.pokeResultsTemp = this.state.pokeResults
    this.props.storeData(this.state.pokeResults)
    this.state.pokeResults = this.state.pokeResults.filter((e, index) => {return index < 807})
  }
  loadMore = () => {
    let oldCurrent = this.state.current
    this.setState({current: this.state.current + 12})
    setTimeout(() => {
      for (let i = oldCurrent; i <=  this.state.current - 1; i++) {
        this.setState({ pokeResultBinds: [...this.state.pokeResultBinds, this.state.pokeResults[i]] })
      }
    }, 100)
  }
  chooseFilter = (type) => { 
    this.openOptions() 
    this.setState({ pokeResultBinds: [], current: 0 })
    if (type === 'low') {
      this.setState({ titleBtn: 'Lowest Number (First)' })
      if (this.state.highToLow && this.state.setAlphabet) {
        this.setState({ highToLow: false, setAlphabet: false })
        this.setLowtoHigh()
      } else {
        if (this.state.highToLow) {
          this.setState({ highToLow: false })
          this.setHighToLow()
        }
        if (this.state.setAlphabet) {
          this.setState({ setAlphabet: true })
          this.setLowtoHigh()
        }
      }
    } else if (type === 'high') {
      this.setState({ titleBtn: 'Highest Number (First)' })
      if (!this.state.highToLow) {
        this.setState({ highToLow: true})
        this.setHighToLow()
      }
    } else if (type === 'A') {
      this.setState({ setAlphabet: true })
      this.setState({ titleBtn: 'A - Z'})
      setTimeout(() => {
        this.setAtoZ() 
      }, 100);     
    } else {
      this.setState({ setAlphabet: true, titleBtn: 'Z - A' })
      this.setZtoA()   
    }
    setTimeout(() => {this.loadMore()}, 100)    
  }
  setLowtoHigh = () => {
    this.state.pokeResults = this.state.pokeResultsTemp.filter((e, index) => {return index < 807})
  }
  setHighToLow = () => {
    this.state.pokeResults = this.state.pokeResultsTemp.filter((e, index) => {return index < 807}).reverse()
  }
  setAtoZ = () => {
    this.state.pokeResults.sort((a,b) => {
      let nameA = a.name.toUpperCase()
      let nameB = b.name.toUpperCase()
      return nameA.localeCompare(nameB)
    })
  }
  setZtoA = () => {
    this.setAtoZ()
    this.state.pokeResults.reverse()
  }
  openOptions = () => {
    this.setState({ showOption: !this.state.showOption })
  }
  render() { 
    const CardPoke = this.state.pokeResultBinds.map((e, index)=> {
      return <Card key={index} url={e.url}/>
    })
    return  (
      <div className="dashboard">
        <h2 className="dashboard__heading" onClick={() => console.log(this.state.pokeResults)}>POKEDEX</h2>
        <div className="dashboard__filter">
          <ButtonFilter
            titleBtn={this.state.titleBtn}
            showOption={this.state.showOption}
            openOptions={this.openOptions}
            clickLowToHight={() => this.chooseFilter('low')}
            clickHighToLow={() => this.chooseFilter('high')}
            clickAtoZ={() => this.chooseFilter('A')}
            clickZtoA={() => this.chooseFilter('Z')}
          />
        </div>
        <div>
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
            )
          }
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
  storeData: (payload) => {dispatch(storeData(payload))},
})

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)