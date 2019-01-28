import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import './Main.css'
import Region from '../regions/Region'

class Main extends Component {
  constructor () {
    super()

    this.state = {
      regions: [
        {
          "Dorne": []
        },
        {
          "The North": []
        },
        {
          "The Vale of Arryn": []
        },
        {
          "The Reach": []
        },
        {
          "The Riverlands": []
        },
        {
          "Beyond the Wall": []
        },
        {
          "The Stormlands": []
        },
        {
          "Iron Islands": []
        }
      ]
    }
  }

  render() {
    const regions = this.state.regions.map(region => {
      const regionName = Object.keys(region)[0]
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
