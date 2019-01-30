import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import './Regions.css'

// component: container for regions so view can switch from
// `Regions` component to `Region` component
class Regions extends Component {
  constructor () {
    super()

    this.state = {
        "housesOfDorne": null,
        "housesOfThe North": null,
        "housesOfThe Vale": null,
        "housesOfThe Reach": null,
        "housesOfThe Westerlands": null,
        "housesOfThe Riverlands": null,
        "housesOfThe Crownlands": null,
        "housesOfThe Stormlands": null,
        "housesOfThe Neck": null,
        "housesOfIron Islands": null
        }
      }

  // GET data for each region based on the state key name
  componentDidMount () {
    // regex: look for content after `housesOf`
    const stateRegex = /(?<=housesOf).*/

    // loop through the keys of state
    Object.keys(this.state).forEach(key => {
      // retrieves the result of matching a string against a regex
      const regionName = key.match(stateRegex)[0]
      // GET region data and save to state
      fetch(`https://anapioficeandfire.com/api/houses?region=${regionName}`)
        .then(res => res.ok ? res : new Error())
        .then(res => res.json())
        .then(res => this.setState({ [`housesOf${regionName}`]: res }))
        .catch(console.error)
    })
  }
  render() {
    console.log(this.state)
    const stateRegex = /(?<=housesOf).*/

    const regions = Object.keys(this.state).map(region => {
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
