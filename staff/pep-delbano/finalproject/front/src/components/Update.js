import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import Header from './Header'
// import logic from '../logic'

class Update extends Component {
    state = { type: '', name: '', surname: '', username: '', newPassword: '', password: '' }

    handleTypeChange = event => {
        const type = event.target.value

        this.setState({ type })
    }

    handleNameChange = event => {
        const name = event.target.value

        this.setState({ name })
    }

    handleSurnameChange = event => {
        const surname = event.target.value

        this.setState({ surname })
    }
    
    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handleNewPasswordChange = event => {
        const newPassword = event.target.value

        this.setState({ newPassword })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { name, surname, username, newPassword, password } = this.state

        this.props.onUpdate(name, surname, username, newPassword, password)

        // logic.sendUpdatedInfo(name, surname, username, newPassword, password)


    }

    onGoBack = () => this.props.history.push('/profile')

    render() {
        return <div>
        <Header/> 
            <div className="container-update">
                <h1 className="update-title">Update Profile</h1>
                <form className="form-group form-update" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <select className="form-control" required onChange={this.handleTypeChange}>
                            <option className="form-control" disabled selected > -- Select Type of Client -- </option>
                            <option className="form-control" value="Individual">Individual</option>
                            <option className="form-control" value="Corporate">Corporate</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input className="form-control" required type="text" placeholder="Name" onChange={this.handleNameChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" required type="text" placeholder="Surname" onChange={this.handleSurnameChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" required type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" required type="password" placeholder="Current Password" onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" required type="password" placeholder="New Password Desired" onChange={this.handleNewPasswordChange} />
                    </div>
                    {/* <button type="submit">update</button> <a href="/#/">back</a> */}
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" type="submit">Update</button> 
                    </div>
                <button className="btn-register btn btn-link" href="#" onClick={this.onGoBack}>Go Back</button>
                </form>
            </div>
        </div>
    }
}

export default withRouter(Update)