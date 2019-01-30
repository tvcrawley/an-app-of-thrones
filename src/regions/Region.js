import React, { Component } from 'react'
// import './Region.css'

// component: container for region to display specific info pertaining to it
class Region extends Component {
  render() {
    console.log(this.props)
    const houses = this.props.houses.map((house) => {
      console.log(house)
      return <li key={house.name}>{house.name}</li>
    })

    return (
      <div className="Region">
      Welcome to {this.props.region}
      {houses}
      </div>
    )
  }
}

export default Region
