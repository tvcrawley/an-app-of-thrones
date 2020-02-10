import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import './Region.css'
import House from '../houses/House'

// component: container for region to display specific info pertaining to it
class Region extends Component {
  constructor () {
    super ()

    this.state = {
      overlord: null
    }
  }

  // GET overlord data and save to state
  componentDidMount () {
    if (this.props.houses && this.props.houses[0].overlord) {
      fetch(this.props.houses[0].overlord)
        .then(res => res.ok ? res : new Error())
        .then(res => res.json())
        .then(res => this.setState({ overlord: res.name }))
        .catch(console.error)
    }
  }

  render() {
    if (!this.props.houses) {
      return <Redirect to='/' />
    }

    const houses = this.props.houses.map((house) => {
      return <Col md={4} as={'span'} key={house.name}>
               <Link to={`${this.props.match.url}/${house.name}`}> {house.name}</Link>
             </Col>
    })

    const rowOne = houses.slice(0, 3)
    const rowTwo = houses.slice(3, 6)
    const rowThree = houses.slice(6)

    return (
      <div className="Region">
        Welcome to {this.props.region}
        {this.state.overlord ?
          <p>Reigning Overlord: {this.state.overlord}</p> : null}

        <Container>
          <Row>{rowOne}</Row>
          <Row>{rowTwo}</Row>
          <Row>{rowThree}</Row>
        </Container>

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
