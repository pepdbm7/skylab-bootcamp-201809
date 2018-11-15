import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'



class Profile extends Component {
    state = { name: '', surname: '', username: '' }

    componentDidMount() {
        try {
            logic.getUser()
            .then(user => { this.setState({ name: user.name, surname: user.surname, username: user.username }) })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }

    handleEditClick = () => this.props.history.push('/update')

    onGoBack = () => this.props.history.push('/postits')

    render() {
        return <div className="container-Profile">
            <h1 className="login-title">Profile</h1>
            <div className="input-group-prepend"><span className="input-group-text" id="inputGroup-sizing-default">Name</span>
            </div> <p>{this.state.name}</p>
            <div className="input-group-prepend"><span className="input-group-text" id="inputGroup-sizing-default">Surname</span>
            </div> <p>{this.state.surname}</p>
            <div className="input-group-prepend"><span className="input-group-text" id="inputGroup-sizing-default">Username</span>
            </div> <p>{this.state.username}</p>
            <div className="form-group">
                <button className="btn btn-primary btn-lg" type="submit" onClick={this.handleEditClick}>Edit profile</button>
                <button className="btn-register btn btn-link" href="#" onClick={this.onGoBack}>Go Back</button>
            </div>
      
        </div>
    }
}

export default withRouter(Profile)