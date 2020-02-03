import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <Link to='/'>An App of Thrones</Link>
      </header>
    )
  }
}

export default Header
