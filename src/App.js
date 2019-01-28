import React, { Component } from 'react'
import './App.css'
import Header from './layout/Header'
import Main from './layout/Main'
import Footer from './layout/Footer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App
