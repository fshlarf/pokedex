import React, { Component } from 'react'
import './CardStyle.scss'

class card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      types: [
        {
          type: {
            name: 'poison'
          }
        },
        {
          type: {
            name: 'fire'
          }
        }
      ]
    }
  }
  render() {
    const PokeAbility = this.state.types.map((e, index)=> {
      let className = 'ability'
      className += ' ' + e.type.name 
      return (<p className={className} key={index}>{e.type.name}</p>)
    })
    return  (
      <div className="card">
        <div className="card__img">
          <img
            src='https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png'
          />
        </div>
        <div className="card__body">
          <p className="card__body-id">#001</p>
          <h5 className="card__body-heading">Bulbasaur</h5>
          <div className="card__body-ability">{PokeAbility}</div>
        </div>
      </div>
    )
  }
}

export default card