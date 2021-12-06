import React, { Component } from "react"
import "./App.css"
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import Axios from "axios"
import Search from "./components/users/Search"
import Alert from "./components/layout/Alert"
import PropTypes from "prop-types"

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
  }

  // Search github users
  searchUsers = async text => {
    this.setState({ loading: true })
    const response = await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: response.data.items, loading: false })
  }

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false })

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })
    setTimeout(() => this.setState({ alert: null }), 4000)
  }

  render() {
    const { users, loading } = this.state
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search clearUsers={this.clearUsers} searchUsers={this.searchUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    )
  }
}

export default App
