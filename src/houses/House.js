import React, { Component } from 'react'
import './House.css'
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

  getSwornMembers (member) {
    fetch(member)
    .then(res => res.ok ? res : new Error())
    .then(res => res.json())
    .then(res => {
      const swornMembers = [...this.state.swornMembers]
      swornMembers.push(res)
      return this.setState({swornMembers})
    })
    .catch(console.error)
  }

  getCurrentLord () {
    if (this.props.house.currentLord) {
      fetch(this.props.house.currentLord)
        .then(res => res.ok ? res : new Error())
        .then(res => res.json())
        .then(res => this.setState({ currentLord: res.name }))
        .catch(console.error)
    }
  }

  // GET swornMembers and currentLord data and save to state
  componentDidMount() {
    this.props.house.swornMembers.forEach(member => this.getSwornMembers(member))
    this.getCurrentLord()
   }

   // render component and check if the previous prop has changed
   componentDidUpdate(prevProps) {
     if(prevProps === undefined) {
       return false
     }

     // reload swornMembers and currentLord data if there is a different
     // houseName in params
     if (prevProps.match.params.houseName !== this.props.match.params.houseName) {
       this.setState({swornMembers: []})
       this.setState({currentLord: null})

       this.props.house.swornMembers.forEach(member => this.getSwornMembers(member))
       this.getCurrentLord()
      }
   }

  render() {
    const { name, words, coatOfArms, ancestralWeapons } = this.props.house
    const { swornMembers, currentLord } = this.state

    const ancestralWeaponsJSX = ancestralWeapons.map(weapon => (
      <li key={weapon}>{weapon}</li>
    ))

    const swornMembersJSX = swornMembers.map(member => {
      // find numbers at the end of the member's url
      // ex: https://anapioficeandfire.com/api/characters/497
      const memberNumber = member.url.replace(/\D/g, '')
      return <li key={memberNumber}>{member.name}</li>
    })

    return (
      <div className="House">
        <h3>{name}</h3>

        {words ? <h4>Words: {words}</h4> : null}
        {coatOfArms ? <h4>Coat of Arms: {coatOfArms}</h4> : null}
        {ancestralWeapons[0] ? <ul><h4>Ancestral Weapons: </h4>{ancestralWeaponsJSX}</ul> : null}
        {currentLord ? <h4>Current Lord: {currentLord}</h4> : <h4>No current lord</h4>}
        {swornMembers[0] ? <ul><h4>Sworn Members: </h4>{swornMembersJSX}</ul> : null}
        
      </div>
    )
  }
}

export default withRouter(House)
