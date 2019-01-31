import React, { Component } from 'react'
// import './House.css'

// component: container for region to display specific info pertaining to it
class House extends Component {
  render() {
    const ancestralWeapons = this.props.house.ancestralWeapons.map(weapon => (
      <li key={weapon}>{weapon}</li>
    ))

    return (
      <div className="House">
        <h3>{this.props.house.name}</h3>
        {this.props.house.coatOfArms ?
          <p>Coat of Arms: {this.props.house.coatOfArms}</p> : null}
        {this.props.house.ancestralWeapons[0] ?
          <ul>Ancestral Weapons: {ancestralWeapons}</ul> : null}
      </div>
    )
  }
}

export default House
