import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'





class Payment extends Component {
    state = { error: null }

    // componentDidMount() {
    //     try {
    //         logic.retrieveUser()
    //         .then(user => { this.setState({ type: user.type, name: user.name, surname: user.surname, username: user.username }) })
    //         .catch(err => this.setState({ error: err.message }))
    //     } catch (err) {
    //         this.setState({ error: err.message })
    //     }
    // }

    onGoBack = () => this.props.history.push('/setorder')


    handleHolder = () => {

    }

    handleCardNum = () => {
        
    }

    handleMonth = () => {
        
    }

    handleYear = () => {
        
    }

    handleCVC = () => {
        
    }

    handleDate = () => {
        
    }

    onSubmit = () => {
        const { products } = this.props.products //array con obj d productos, con todos sus fields (quantity, name, etc)
        const { total } = this.props.total
        const { place } = this.props.place
        const { date } = this.props.date

        try {
            logic.createNewOrder(products, total, place, date)
            .then(() => {
                this.setState({ error: null }, () => this.props.history.push('/thanks'))
            })
            .catch(err => this.setState({ error: err.message }))
        } catch (err) {
            this.setState({ error: err.message })
        }
    }




    render() {
        return <div className="container-Payment">
                <h1 className="Payment-title">Payment</h1>
                <form className="form-group form-Payment" onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Credit Card Holder</label>
                        <input className="form-control Payment"  required  type="text" onChange={this.handleHolder} />
                    </div>

                    <div className="form-group">
                        <label>Credit Card Number</label>
                        <input className="form-control Payment"  required type="text" onChange={this.handleCardNum} />
                    </div>
                    <div className="form-group">Expiration Date
                        <div className="form-group">
                            <select className="form-control" required onChange={this.handleMonth}>
                                <option className="form-control" disabled selected > mm </option>
                                <option className="form-control" value="Individual">1</option>
                                <option className="form-control" value="Individual">2</option>
                                <option className="form-control" value="Individual">3</option>
                                <option className="form-control" value="Individual">4</option>
                                <option className="form-control" value="Individual">5</option>
                                <option className="form-control" value="Individual">6</option>
                                <option className="form-control" value="Individual">7</option>
                                <option className="form-control" value="Individual">8</option>
                                <option className="form-control" value="Individual">9</option>
                                <option className="form-control" value="Individual">10</option>
                                <option className="form-control" value="Individual">11</option>
                                <option className="form-control" value="Individual">12</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control" required onChange={this.handleYear}>
                                <option className="form-control" disabled selected > yyyy </option>
                                <option className="form-control" value="Individual">2018</option>
                                <option className="form-control" value="Individual">2019</option>
                                <option className="form-control" value="Individual">2020</option>
                                <option className="form-control" value="Individual">2021</option>
                                <option className="form-control" value="Individual">2022</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>CVC</label>
                        <input className="form-control Payment" required type="password" onChange={this.state.handleCVC} />
                    </div>

                </form>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" type="submit" onClick={this.goToThanks}>PAY</button>
                    <button className="btn-Payment btn btn-link" href="#" onClick={this.onGoBack}>Go Back</button>
                </div>
        
            </div>

    }
}

export default withRouter(Payment)