import React, { Component } from 'react'
import './CardStyle.scss'
import http from './../../services/http'
import { connect } from 'react-redux'
import { storeData } from './../../redux/actions'
import { withRouter} from 'react-router-dom'

class card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      types: [],
      allPokeData: []
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData = async () => {
    const res = await http.get(this.props.url)
    let stringId = (res.data.id).toString()
    if (stringId.length === 1) {
      stringId =  '00' + stringId
    } else if (stringId.length === 2) {
      stringId = '0' + stringId
    } else {
      stringId = stringId
    }
    this.setState({
      id: stringId,
      name: res.data.name,
      types: res.data.types,
    })
  }
  openDetail = e => {
    this.props.history.push('/detail/' + parseInt(this.state.id))
  }
  render() {
    const PokeAbility = this.state.types.map((e, index)=> {
      let className = 'ability'
      className += ' ' + e.type.name 
      return (<p className={className} key={index}>{e.type.name}</p>)
    })
    return  (
      <div className="card" onClick={this.openDetail}>
        <div className="card__img">
          <img
            src={'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/' + this.state.id + '.png'}
          />
        </div>
        <div className="card__body">
          <p className="card__body-id">#{this.state.id}</p>
          <h5 className="card__body-heading">{this.state.name}</h5>
          <div className="card__body-ability">{PokeAbility}</div>
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
  storeData: (payload) => {dispatch(storeData(payload))}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (card))