import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Regions.css'

// component: container for regions so view can switch from
// `Regions` component to `Region` component
class Regions extends Component {
  render() {

    const regions = Object.keys(this.props.regions).map(regionName => {
      return <Col md={4} as={'span'} key={regionName}>
              <Link to={`/regions/${regionName}`}> {regionName}</Link>
            </Col>
    })

    const rowOne = regions.slice(0, 3)
    const rowTwo = regions.slice(3, 6)
    const rowThree = regions.slice(6)

    return (
      <Container className="Regions">
        <Row>{rowOne}</Row>
        <Row>{rowTwo}</Row>
        <Row>{rowThree}</Row>
      </Container>
    )
  }
}

export default Regions
