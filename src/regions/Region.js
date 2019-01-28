import React, { Component } from 'react'
// import './Region.css'

class Region extends Component {
  render() {
    console.log(this.props)
    const regionName = this.props.match.params.regionName
    return (
      <div className="Region">
      Welcome to {regionName}
      </div>
    )
  }
}

export default Region
