import React, { Component } from 'react'
import './DetailStyle.scss'

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {height: "2' 04''"},
        {weight: '15.2 lbs'},
        {category: 'seed'}
      ],
      types: []
    }
  }
  render() {
    const PokeAbility = this.state.types.map((e, index)=> {
      let className = 'ability'
      className += ' ' + e.type.name 
      return (<p className={className} key={index}>{e.type.name}</p>)
    })
    return (
      <div className="detail">
        <h4 className="detail__heading">Bulbasaur #001</h4>
        <div className="detail__top">
          <div className="detail__top-left">
            <div className="left__img">
              <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"/>
            </div>
            <div className="left__stats">

            </div>
          </div>
          <div className="detail__top-right">
            <div className="right__desc">
              Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.
            </div>
            <div className="right__data">
              <div>
                <p className="right__data-key">height</p>
                <p>2' 05''</p>
              </div>
              <div> 
                <p className="right__data-key">weight</p><p>15.2 lbs</p>
              </div>
              <div><p className="right__data-key">category </p><p>seed</p></div>
            </div>
            <div className="right__type">
              <h4 className="heading">Type</h4>
              {PokeAbility}
            </div>
            <div className="right__weakness">
              <h4 className="heading">Weakness</h4>
              <p className="ability">Flying</p>
            </div>
          </div>
        </div>
        <div className="detail__bottom">

        </div>
      </div>
    )
  }
}

export default Detail