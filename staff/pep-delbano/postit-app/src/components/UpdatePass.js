import React, {Component} from 'react'

class UpdatePass extends Component {
    state = { name: '', surname: '', username:'', oldPassword: '', newPassword: '' }

    handleUsernameChange = event => {
        const username = event.target.value

        this.setState({ username })
    }

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { username, newPassword } = this.state

        this.props.onUpdate(username, password)
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Name" onChange={this.handleNameChange} />
            <input type="text" placeholder="Surname" onChange={this.handleSurnameChange} />
            <input type="text" placeholder="Usernname" onChange={this.handleUsernameChange} />
            <input type="password" placeholder="New Password" onChange={this.handlePasswordChange}/>
            <input type="password" placeholder="Confirm Password" onChange={this.handlePasswordChange}/>
            
            <input type="password" placeholder="Old Password" onChange={this.handlePasswordChange} />
            <button type="submit">Update</button> <a href="#" onClick={this.props.onGoBack}>back</a>
        </form>
    }
}

export default UpdatePass