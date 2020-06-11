import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Home from '../Home/Home'
import About from '../About/About'
import CollectionCreate from '../Collections/CollectionCreate'
import CollectionIndex from '../Collections/CollectionIndex'
import CollectionShow from '../Collections/CollectionShow'
import CollectionEdit from '../Collections/CollectionEdit'
import CardShow from '../Cards/CardShow'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/about' render={() => (
            <About />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-collection' render={() => (
            <CollectionCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collections' render={() => (
            <CollectionIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collections/:id' render={() => (
            <CollectionShow msgAlert={this.msgAlert} user={user} match={this.props.params} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collections/:id/edit' render={() => (
            <CollectionEdit msgAlert={this.msgAlert} user={user} match={this.props.pararms} />
          )} />
          <AuthenticatedRoute user={user} exact path='/cards/:id' render={() => (
            <CardShow msgAlert={this.msgAlert} user={user} match={this.props.params} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
