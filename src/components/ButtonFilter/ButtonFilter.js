import React, { Component } from 'react'
import './ButtonFilter.scss'
import ChevronDown from './../../assets/img/chevron-down.png'

class ButtonFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleBtn: 'Lowest Number (First)',
      showOption: false
    }
  }
  openOptions = () => {
    this.setState({ showOption: !this.state.showOption })
  }
  render() {
    return (
      <div>
        <div className="filter" onClick={this.openOptions}>
          <div className="filter__btn">{this.state.titleBtn} <img src={ChevronDown}/></div>
        </div>
        {this.state.showOption ? 
          (<div className="option">
            <p onClick={this.props.clickLowToHight}>Lowest Number (First)</p>
            <p onClick={this.props.clickHighToLow}>Highest Number (First)</p>
            <p onClick={this.props.clickAtoZ}>A - Z</p>
            <p onClick={this.props.clickZtoA}>Z - A</p>
          </div>) : ('')}
      </div>
    )
  }
}

export default ButtonFilter