import React, { Component } from 'react'
// import './Region.css'

// component: container for region to display specific info pertaining to it
class Region extends Component {
  render() {
    console.log(this.props)
    // accessing the name of the region based on the url param
    const regionName = this.props.match.params.regionName
    return (
      <div className="Region">
      Welcome to {regionName}
      </div>
    )
  }
}

export default Region
