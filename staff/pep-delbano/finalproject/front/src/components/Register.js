import React, { Component } from 'react'
import logic from '../logic'

class Register extends Component {
    state = { registerDoneMessage: null, registerErrorMessage: null, type: '', name: '', surname: '', username: '', password: '' }

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

    handlePasswordChange = event => {
        const password = event.target.value

        this.setState({ password })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { type, name, surname, username, password } = this.state

        try {
            logic.registerUser(type, name, surname, username, password)
            .then(()=> {
            
                this.setState({ registerDoneMessage: `Great! ' ${username} ' successfully registered`, name: '', surname: '', username: '', password: '' }, () => {
                        setTimeout(() => {
                            this.setState({registerDoneMessage: null})                
                        }, 3000)
                    })       
            })
            .catch((err) => {
                this.setState({ registerErrorMessage: err.message }, () =>{
                    setTimeout(() => {
                        this.setState({registerErrorMessage: null})                
                    }, 3000)
                })
            })
        } catch(err) {
            this.setState({ registerErrorMessage: err.message }, () =>{
                setTimeout(() => {
                    this.setState({registerErrorMessage: null})                
                }, 3000)
            })
        }

    }

    render() {

        let error = () => {
            console.log(this.state.registerDoneMessage)
            if (this.state.registerDoneMessage) {
                return (<p className="correct">{this.state.registerDoneMessage}</p>)
            }
            else if (this.state.registerErrorMessage) {
                return (<p className="error">{this.state.registerErrorMessage}</p>)
            }
           return null
        } 

        return <div className="container-register">
            <h1 className="register-title">Sign Up</h1>
            <form className="form-group form-register" onSubmit={this.handleSubmit}>
                <div class="form-group">
                <select className="form-control" required onChange={this.handleTypeChange}>
                    <option className="form-control" disabled selected > -- Select Type of Client -- </option>
                    <option className="form-control" value="Individual">Individual</option>
                    <option className="form-control" value="Corporate">Corporate</option>
                </select>
                </div>
                <div className="form-group">
                    <input className="form-control" required type="text" value={this.state.name} placeholder="Name" onChange={this.handleNameChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" required type="text" value={this.state.surname} placeholder="Surname" onChange={this.handleSurnameChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" required type="text" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange} />
                </div>
                <div className="form-group">    
                    <input className="form-control" required type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg"type="submit">Register</button> <button className="btn-register btn btn-link" href="#" onClick={this.props.onGoBack}>Go Back</button>
                </div>
                {error()}
            </form>
        </div>
    }
}

export default Register