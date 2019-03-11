import React, { Component } from 'react'
// import './House.css'
import { withRouter } from 'react-router'

// component: container for region to display specific info pertaining to it
class House extends Component {
  constructor() {
    super()

    this.state = {
      swornMembers: [],
      currentLord: null
    }
  }

  // initial rendering of component
  componentDidMount() {
    this.props.house.swornMembers.forEach(member => {
      fetch(member)
        .then(res => res.ok ? res : new Error())
        .then(res => res.json())
        .then(res => {
          const swornMembers = [...this.state.swornMembers]
          swornMembers.push(res)
          return this.setState({swornMembers})
        })
        .catch(console.error)
      })

      if (this.props.house.currentLord) {
        fetch(this.props.house.currentLord)
          .then(res => res.ok ? res : new Error())
          .then(res => res.json())
          .then(res => this.setState({ currentLord: res.name }))
          .catch(console.error)
      }
   }

   // component render with check for previous prop change
   componentDidUpdate(prevProps) {
     if(prevProps === undefined) {
       return false
     }

     // load swornMembers data if there is a different houseName in params
     if (prevProps.match.params.houseName !== this.props.match.params.houseName) {
       this.setState({swornMembers: []})
       this.setState({currentLord: null})

       this.props.house.swornMembers.forEach(member => {
         fetch(member)
          .then(res => res.ok ? res : new Error())
          .then(res => res.json())
          .then(res => {
            const swornMembers = [...this.state.swornMembers]
            swornMembers.push(res)
            return this.setState({swornMembers})
          })
          .catch(console.error)
        })

        if (this.props.house.currentLord) {
          fetch(this.props.house.currentLord)
            .then(res => res.ok ? res : new Error())
            .then(res => res.json())
            .then(res => this.setState({ currentLord: res.name }))
            .catch(console.error)
        }
      }
   }

  render() {

    const ancestralWeapons = this.props.house.ancestralWeapons.map(weapon => (
      <li key={weapon}>{weapon}</li>
    ))

    const swornMembers = this.state.swornMembers.map(member => {
      // find numbers at the end of the member's url
      // ex: https://anapioficeandfire.com/api/characters/497
      const memberNumber = member.url.replace(/\D/g, '')
      return <li key={memberNumber}>{member.name}</li>
    })

    return (
      <div className="House">
        <h3>{this.props.house.name}</h3>
        {this.props.house.words ?
          <p>Words: {this.props.house.words}</p> : null}
        {this.props.house.coatOfArms ?
          <p>Coat of Arms: {this.props.house.coatOfArms}</p> : null}
        {this.props.house.ancestralWeapons[0] ?
          <ul>Ancestral Weapons: {ancestralWeapons}</ul> : null}
        {this.state.currentLord ?
          <p>Current Lord: {this.state.currentLord}</p> : <p>No current lord</p>}
        {this.state.swornMembers[0] ?
          <p>Sworn Members: {swornMembers}</p> : null}
      </div>
    )
  }
}

export default withRouter(House)
