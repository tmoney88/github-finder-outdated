import React, { Component } from "react"
import "./App.css"
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import Axios from "axios"
import Search from "./components/users/Search"
import PropTypes from "prop-types"

class App extends Component {
  state = {
    users: [],
    loading: false
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  }

  //Search github users
  searchUsers = async text => {
    this.setState({ loading: true })
    const response = await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: response.data.items, loading: false })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    )
  }
}

export default App
