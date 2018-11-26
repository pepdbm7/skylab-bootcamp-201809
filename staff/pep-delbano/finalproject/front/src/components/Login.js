import React, {Component} from 'react'
import { withRouter } from "react-router";
import logic from '../logic'

class Login extends Component {
    state = { successMessage: null, errorMessage: null, username: '', password: '' }

    componentWillReceiveProps(props){

        this.setState({message:props.message}, () => {

            setTimeout(() => {
                this.setState({message: null})                
            }, 3000)
        });
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
        
        const { username, password } = this.state
        
        try {
            logic.login(username, password)  
                .then(() => {
                    this.props.history.push('/home')})
                    // this.setState({ successMessage: `Welcome, ${username} !!`, username: '', password: ''}, () => {
                    //     setTimeout(() => {
                    //         this.setState({successMessage:null})
                    //     }, 2500)
                    // })
                    .catch((err) => {
                        this.setState({ errorMessage: err.message }, () =>{
                            setTimeout(() => {
                                this.setState({errorMessage: null})                
                            }, 3000)
                        })
                    })
        } catch(err) {
            this.setState({ errorMessage: err.message }, () =>{
                setTimeout(() => {
                    this.setState({errorMessage: null})                
                }, 3000)
            })
        }
    }

    render() {

        let error = () => {
            // if (this.state.successMessage) {
            //     return (<p className="correct">{this.state.successMessage}</p>)
            // }
            if (this.state.errorMessage) {
                return (<p className="error">{this.state.errorMessage}</p>)
            }
           return null
        } 


        return <div className="container-login">
            <h1 className="login-title">Sign In</h1>
            <form className="form-group form-login" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input className="form-control" required type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                </div>
                <div className="form-group">
                    <input className="form-control" required type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                </div>
 
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" type="submit">Login</button>
                    <button className="btn-register btn btn-link" href="#" onClick={this.props.onGoBack}>Go Back</button>
                </div>
                    {error()}
            </form>
        </div>
    }
}

export default withRouter(Login)