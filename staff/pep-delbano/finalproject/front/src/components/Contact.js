import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
// import logic from '../logic'
import Header from './Header'

// import logic from '../logic'

class Contact extends Component {
    state = { error: null }

    // handleLogoutClick = () => {
    //     logic.logout()

    //     this.props.history.push('/')
    // }

    render() {
        const { error } = this.state

        return ( <div>
            <Header/>
            <div className="container-contact">
                <h1 className="contact-title">Contact</h1>
            <form className="form-group form-contact" onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label>Issue</label>
                        <input className="form-control"  type="text" placeholder={this.state.type} />
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea className="form-control contact-textarea" type="text" placeholder="Write here..." onChange={this.handleTextareaChange} />
                    </div>
                
                <div className="form-group">
                    <button className="btn btn-primary btn-lg"type="submit">Send</button>
                    {/* <button className="btn-contact btn btn-link" href="#" onClick={this.props.onGoBack}>Go Back</button> */}
                </div>

            </form>
            </div> 
        </div> 
        )
    }
}

export default withRouter(Contact)