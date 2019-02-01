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
        "Dorne": null,
        "The North": null,
        "The Vale": null,
        "The Reach": null,
        "The Westerlands": null,
        "The Riverlands": null,
        "The Crownlands": null,
        "The Stormlands": null,
        "The Neck": null,
        "Iron Islands": null
        }
      }

  // GET data for each region based on the state key name
  componentDidMount () {

    // loop through the keys of state
    Object.keys(this.state).forEach(regionName => {

      // GET region data and save to state
      fetch(`https://anapioficeandfire.com/api/houses?region=${regionName}`)
        .then(res => res.ok ? res : new Error())
        .then(res => res.json())
        .then(res => this.setState({ [regionName]: res }))
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

            // render the data for the correct region based on a comparison
            // between the regionName from params and state
            const regionHouses = Object.keys(this.state).filter(regionName => {
              return (match.params.regionName === regionName) && (this.state[regionName])
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
