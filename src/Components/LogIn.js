import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LogIn extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({user: updatedUser})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true})
  }

  render () {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile"/>)
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div class="form-group">
            <label for="username">User Name:</label>
            <input type="username" class="form-control" id="username" aria-describedby="username" placeholder="Enter Name"
            onChange={this.handleChange}/>
            </div>
            <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" aria-describedby="password" 
            placeholder="Enter Password" onChange={this.handleChange}/>
            </div>
            <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default LogIn;