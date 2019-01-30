import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import './Regions.css'

// component: container for regions so view can switch from
// `Regions` component to `Region` component
class Regions extends Component {
  render() {
    const stateRegex = /(?<=housesOf).*/

    const regions = Object.keys(this.props.regions).map(region => {
      const regionName = region.match(stateRegex)[0]

      return <li key={regionName}>
               <Link to={`/regions/${regionName}`}> {regionName}</Link>
             </li>
    })
    return (
      <div className="Regions">
        {regions}
      </div>
    )
  }
}

export default Regions
