import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import './Regions.css'

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

  componentDidMount () {
    const stateRegex = /(?<=housesOf).*/

    Object.keys(this.state).forEach(key => {
      if (stateRegex.test(key)) {
        const regionName = key.match(stateRegex)[0]
          fetch(`https://anapioficeandfire.com/api/houses?region=${regionName}`)
          .then(res => res.ok ? res : new Error())
          .then(res => res.json())
          .then(res => this.setState({ [`housesOf${regionName}`]: res }))
      }
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
