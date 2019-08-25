import React, { Component } from 'react'
import './DetailStyle.scss'
import http from './../../services/http'
import MaleLogo from './../../assets/img/male.png'
import FemaleLogo from './../../assets/img/female.png'
import { withRouter} from 'react-router-dom'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      height: null,
      weight: null,
      types: [],
      abilities: [],
      stats: []
    }
  }
  componentDidMount() {
    this.getDataPoke()
  }
  getDataPoke = async () => {
    const { id } = this.props.match.params
    const res = await http.get('https://pokeapi.co/api/v2/pokemon/' + id)
    this.setIdToString(id)
    this.setState({
      types: res.data.types,
      name: res.data.name,
      height: (res.data.height * 10 / 30.48),
      weight: (res.data.weight * 100 / 453.592).toFixed(1),
      abilities: res.data.abilities,
      stats: res.data.stats
    })
  }
  setIdToString = (val) => {
    if (val.length === 1) {
      this.setState({ id: '00' + val})
    } else if (val.length === 2) {
      this.setState({ id: '0' + val})
    } else {
      this.setState({ id: val})
    }
  }
  toDashboard = () => {
    this.props.history.push('/')
  }
  render() {
    const PokeAbility = this.state.types.map((e, index)=> {
      let className = 'ability'
      className += ' ' + e.type.name 
      return (<p className={className} key={index}>{e.type.name}</p>)
    })
    const Abilities = this.state.abilities.map((e, index) => {
      if (!e.is_hidden) {
        return (<p className="right__data-value" key={index}>{e.ability.name}</p>)
      }
    })
    const Stats = this.state.stats.map((e, index) => {
      return (<div className="right__stats-content" key={index}><p>{e.stat.name}: {e.base_stat}</p></div>)
    })
    return (
      <div className="detail">
        <h4 className="detail__heading">
          {this.state.name} #{this.state.id}
        </h4>
        <div className="detail__top">
          <div className="detail__top-left">
            <div className="left__img">
              <img src={'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + this.state.id + '.png'}/>
            </div>
          </div>
          <div className="detail__top-right">
            <div className="right__data">
              <div className="right__data-container"><p className="right__data-key">height</p><p>{Math.ceil(this.state.height)} feet</p></div>
              <div className="right__data-container"><p className="right__data-key">weight</p><p>{this.state.weight} lbs</p></div>
              <div className="right__data-container"><p className="right__data-key">gender</p>
                <div>
                  <img className="gender-img" src={MaleLogo}/>
                  <img className="gender-img" src={FemaleLogo}/>
                </div>
              </div>
              <div className="right__data-container"><p className="right__data-key">abilities</p>{Abilities}</div>
            </div>
            <div className="right__type">
              <h4 className="heading">Type</h4>
              <div className="right__type-ability">{PokeAbility}</div>
            </div>
            <div className="right__stats">
              <h4 className="right__stats-heading">Stats</h4>
              {Stats}
            </div>
            <div className="right__button">
              <button onClick={this.toDashboard}>Explore More Pokémon</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Detail)