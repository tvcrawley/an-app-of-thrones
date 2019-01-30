import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import './Main.css'
import Regions from '../regions/Regions'
import Region from '../regions/Region'

class Main extends Component {
  render() {
    return (
      <div className="Main">
        Main
        <Route exact path='/' component={Regions} />
        <Route exact path='/regions/:regionName' component={Region} />
      </div>
    )
  }
}

export default withRouter(Main)
