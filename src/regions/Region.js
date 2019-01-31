import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// import './Region.css'
import House from '../houses/House'

// component: container for region to display specific info pertaining to it
class Region extends Component {
  render() {
    const houses = this.props.houses.map((house) => {
      return <li key={house.name}>
               <Link to={`${this.props.match.url}/${house.name}`}> {house.name}</Link>
             </li>
    })

    return (
      <div className="Region">
        Welcome to {this.props.region}
        {houses}
        <Route path={`${this.props.match.url}/:houseName`} render={
          ({match}) => {
            const regionHouse = this.props.houses.filter(house => {

              return (match.params.houseName === house.name)
            })
            return  <House house={regionHouse[0]} />
          }
        } />
      </div>
    )
  }
}

export default withRouter(Region)
