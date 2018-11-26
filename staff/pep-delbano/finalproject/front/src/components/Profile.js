import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Header from './Header'



class Profile extends Component {
    state = { type: '', name: '', surname: '', username: '', error: null }

    componentDidMount() {
        try {
            logic.retrieveUser()
            .then(user => { this.setState({ type: user.type, name: user.name, surname: user.surname, username: user.username }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleEditClick = () => this.props.history.push('/update')

    // onGoBack = () => this.props.history.push('/home')

    render() {
        return <div>
            <Header/>
            <div className="container-profile">
                <h1 className="profile-title">Profile</h1>
                <form className="form-group form-profile">

                    <div className="form-group">
                        <label>Type of client</label>
                        <input className="form-control profile" disabled  type="text" placeholder={this.state.type} />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control profile" disabled  type="text" placeholder={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label>Surname</label>
                        <input className="form-control profile" disabled type="text" placeholder={this.state.surname} />
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control profile" disabled type="text" placeholder={this.state.username} />
                    </div>

                </form>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" type="submit" onClick={this.handleEditClick}>Edit profile</button>
                    {/* <button className="btn-profile btn btn-link" href="#" onClick={this.onGoBack}>Go Back</button> */}
                </div>
        
            </div> {/* End container-profile */}
        </div>
    }
}

export default withRouter(Profile)