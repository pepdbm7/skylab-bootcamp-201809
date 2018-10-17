import React, {Component} from 'react'

class Login extends Component {
    state = { username: '', password: '' }

    HandleUserChange= event =>{
        const username = event.target.value
        this.setState({username})
    }

    HandlePasswordChange = event => {
        const password = event.target.value
        this.setState({password})
    }

    handleSubmit = event => {
        event.preventDefault()

        const { username, password } = this.state

        this.props.onLoginClick(username, password)
    }

   render() {
        return <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Username" onChange={this.HandleUserChange}/>
            <input type="text" placeholder="Password" onChange={this.HandlePasswordChange}/>
            <button type="submit">Login</button>
        </form>
        
    }
}

export default Login