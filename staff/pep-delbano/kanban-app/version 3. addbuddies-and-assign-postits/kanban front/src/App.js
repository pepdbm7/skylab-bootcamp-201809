import React, { Component } from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Postits from './components/Postits'
import Error from './components/Error'
import Landing from './components/Landing'
import Update from './components/Update'
import Profile from './components/Profile'
import logic from './logic'
import { Route, withRouter, Redirect } from 'react-router-dom'

logic.url = 'http://localhost:5000/api'

class App extends Component {
    state = { error: null }

    handleRegisterClick = () => this.props.history.push('/register')  //it redirects to the new page

    handleLoginClick = () => this.props.history.push('/login')

    //once redirected we'll send as props the data of the formular to the logic methods to save the new user
    handleRegister = (name, surname, username, password) => {
        try {
             return logic.registerUser(name, surname, username, password)
                .then(() => {
                    this.setState({ error: null }, 
                        //() => this.props.history.push('/login')
                    )
                })
                //and we handle the errors:
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleLogin = (username, password) => {
        try {
            logic.login(username, password)  //POST, sends the form inputs values to send to the db through the API
                .then(() =>  this.props.history.push('/postits'))
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleGoBack = () => this.props.history.push('/')

    //when already Logged In:

    handleProfileClick = () => this.props.history.push('/profile')

    handleEdit = () => this.props.history.push('/update')

    handleLogoutClick = () => {
        logic.logout()

        this.props.history.push('/')
    }

    updateProfile = (name, surname, username,  newPassword, password) => {
        try {
            logic.modifyUser(name, surname, username,  newPassword, password)
                .then(() => {
                    this.setState({ error: null }, () => this.props.history.push('/profile'))
                })
                .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }


    render() {
        const { error } = this.state

        return <div>
            <Route exact path="/" render={() => !logic.loggedIn ? <Landing onRegisterClick={this.handleRegisterClick} onLoginClick={this.handleLoginClick} /> : <Redirect to="/postits" />} />
            <Route path="/register" render={() => !logic.loggedIn ? <Register onRegister={this.handleRegister} onGoBack={this.handleGoBack} />  : <Redirect to="/postits" />} />
            <Route path="/login" render={() => !logic.loggedIn ? <Login onLogin={this.handleLogin} onGoBack={this.handleGoBack} />  : <Redirect to="/postits" />} />
            {/* {error && <Error message={error} />} */}
            
            <Route path="/postits" render={() => logic.loggedIn ?
            <div className="container-home">
                <nav class="navbar navbar-light bg-dark"><h1 className="nav-title">MY KANBAN</h1> <div className="nav-rightSide"> <button className="btn btn-primary btn-lg" type="submit" onClick={this.handleProfileClick}>Update Profile</button> <div onClick={this.handleLogoutClick}><i class="fas fa-sign-out-alt"></i> <p>Logout</p></div>  </div> </nav>
                <Postits />
            </div> : <Redirect to="/" />} />
            
            <Route path="/profile" render={() => logic.loggedIn ? <Profile/>  : <Redirect to="/" />} />
            
            <Route path="/update" render={() => logic.loggedIn ? <Update onUpdate={this.updateProfile}/>  : <Redirect to="/" />} />

        </div>
    }
}

export default withRouter(App)
