import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import './Main.css'
import Regions from '../regions/Regions'
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
    return (
      <div className="Main">
        Main

        <Route exact path='/' render={
          () => <Regions regions={this.state} />
        } />
        <Route path='/regions/:regionName' render={
          ({match}) => {
            const stateRegex = /(?<=housesOf).*/

            // render the data for the correct region based on a comparison
            // between the regionName from params and state
            const regionHouses = Object.keys(this.state).filter(key => {
              const regionName = key.match(stateRegex)[0]
              return (match.params.regionName === regionName) && (this.state[key])
            })
            return  <Region
                      region={match.params.regionName}
                      houses={this.state[regionHouses]}
                    />
          }
        } />
      </div>
    )
  }
}

export default withRouter(Main)
