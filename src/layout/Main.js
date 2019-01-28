import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './Main.css'
import Region from '../regions/Region'

class Main extends Component {
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
      <div className="Main">
        Main
        {regions}
        <Route
        path='/regions/:regionName'
          component={Region}
        />
      </div>
    )
  }
}

export default withRouter(Main)
