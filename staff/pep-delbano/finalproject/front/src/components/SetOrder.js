import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'
import Error from './Error'
import Popup from './Popup'




class SetOrder extends Component {

    state = { errorMessage: null, place: '', day:'', month:'', year:'', time: '', comments:'', holder: '', num: '', exmonth:'', exyear:'', cvc:'', paid: false, detailsActive: true, detailsCard: false, show: false }


    onGoBack = () => {
        logic.deleteUnfinishedOrders()
            .then(() => this.props.history.push('/cart'))
    }

    onGoBackToDetails = event => {
        event.preventDefault()
        this.setState({ detailsActive: true })
        this.setState({ detailsCard: false })
    }

    
    handleAddress = event => {
        const place = event.target.value
        this.setState({ place: place })
    }

    handleDay = event => {
        const day = event.target.value
        this.setState({ day: day })
    }

    handleMonth = event => {
        const month = event.target.value
        this.setState({ month: month })
    }

    handleYear = event => {
        const year = event.target.value
        this.setState({ year: year })
    }

    handleTime = event => {
        const time = event.target.value
        this.setState({ time: time })
    }

    handleComment = event => {
        const comment = event.target.value
        this.setState({ comments: comment })
    }


    // we DON'T save credit card details!!:
    handleHolder = event => {
        const holder = event.target.value
        this.setState({ holder: holder })
    }

    handleCardNum = event => {
        const num = event.target.value
        this.setState({ num: num })
    }

    handleExMonth = event => {
        const exmonth = event.target.value
        this.setState({ exmonth: exmonth })
    }

    handleExYear = event => {
        const exyear = event.target.value
        this.setState({ exyear: exyear })
    }

    handleCVC = event => {
        const cvc = event.target.value
        this.setState({ cvc: cvc })
    }


    onDetailsSubmit = () => {  //go to 2nd form:
        if (!this.state.place || !this.state.day || !this.state.month || !this.state.year || !this.state.time) {
            this.setState({ errorMessage: 'Error: Some required fields still empty!' })
        } else {
            this.setState({ errorMessage: null, detailsActive: false, detailsCard: true })
        }
    }

    onPaySubmit = () => {  //paid!, modal and vieworders:
        if (!this.state.holder || !this.state.num || !this.state.exmonth || !this.state.exyear || !this.state.cvc) {
            this.setState({ errorMessage: 'Error: Some required fields still empty!' })
        } else {
            try {
                let { place, day, month, year, time, comments, paid } = this.state
                
                paid = true
                
                logic.addDroppingDetails(place, day, month, year, time, comments, paid)
                    .then(() => this.setState({detailsActive: false, detailsCard: true, show: true}))
                
            } catch ({ message }) {

                alert(message)
            }
        }
    }

    closePopup = () => {
        this.setState({ show: false }, () => this.props.history.push('/vieworders'))
        
    }

    render() {
        return <div>
            <div className= { `${ this.state.detailsActive ? "detailsActive" : "detailsDisabled" }` } >
                <h1 className="orderDetails__title">Dropping details</h1>
                <form className="form-group orderDetails__form" onSubmit={this.onDetailsSubmit}>
                        <h2>Where do you want it? *</h2>
                        <input className="form-control" required type="text" placeholder="Write an address here..." autofocus="true" onChange={this.handleAddress} />

                    <div className="form-group">
                        <h2>Choose a date and a time frame*</h2>
                        <label>Day</label>
                        <select className="form-control" required onChange={this.handleDay}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="1">1</option>
                            <option className="form-control" value="2">2</option>
                            <option className="form-control" value="3">3</option>
                            <option className="form-control" value="4">4</option>
                            <option className="form-control" value="5">5</option>
                            <option className="form-control" value="6">6</option>
                            <option className="form-control" value="7">7</option>
                            <option className="form-control" value="8">8</option>
                            <option className="form-control" value="9">9</option>
                            <option className="form-control" value="19">10</option>
                            <option className="form-control" value="11">11</option>
                            <option className="form-control" value="12">12</option>
                            <option className="form-control" value="13">13</option>
                            <option className="form-control" value="14">14</option>
                            <option className="form-control" value="15">15</option>
                            <option className="form-control" value="16">16</option>
                            <option className="form-control" value="17">17</option>
                            <option className="form-control" value="18">18</option>
                            <option className="form-control" value="19">19</option>
                            <option className="form-control" value="20">20</option>
                            <option className="form-control" value="21">21</option>
                            <option className="form-control" value="22">22</option>
                            <option className="form-control" value="23">23</option>
                            <option className="form-control" value="24">24</option>
                            <option className="form-control" value="25">25</option>
                            <option className="form-control" value="26">26</option>
                            <option className="form-control" value="27">27</option>
                            <option className="form-control" value="28">28</option>
                            <option className="form-control" value="29">29</option>
                            <option className="form-control" value="30">30</option>
                            <option className="form-control" value="31">31</option>
                        </select>

                        <label>Month</label>
                        <select className="form-control" required onChange={this.handleMonth}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="January">January</option>
                            <option className="form-control" value="February">February</option>
                            <option className="form-control" value="March">March</option>
                            <option className="form-control" value="April">April</option>
                            <option className="form-control" value="May">May</option>
                            <option className="form-control" value="June">June</option>
                            <option className="form-control" value="July">July</option>
                            <option className="form-control" value="August">August</option>
                            <option className="form-control" value="September">September</option>
                            <option className="form-control" value="October">October</option>
                            <option className="form-control" value="November">November</option>
                            <option className="form-control" value="December">December</option>
                        </select>

                        <label>Year</label>
                        <select className="form-control" required onChange={this.handleYear}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="2018">2018</option>
                            <option className="form-control" value="2019">2019</option>
                            <option className="form-control" value="2020">2020</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Time Frame</label>
                        <select className="form-control" required onChange={this.handleTime}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="07:00 - 07:30">07:00 - 07:30</option>
                            <option className="form-control" value="07:30 - 08:00">07:30 - 08:00</option>
                            <option className="form-control" value="08:00 - 08:30">08:00 - 08:30</option>
                            <option className="form-control" value="08:30 - 09:00">08:30 - 09:00</option>
                            <option className="form-control" value="09:00 - 09:30">09:00 - 09:30</option>
                            <option className="form-control" value="09:30 - 10:00">09:30 - 10:00</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <h2>Add more details</h2>
                        <textarea className="form-control" type="text" placeholder="Write a comment..." onChange={this.handleComment} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" type="submit">NEXT</button>
                        <button className="btn-OrderDate btn btn-link" href="#" onClick={this.onGoBack}>Go Back</button>
                    </div>
                    <p className="required-fields">* (fields required)</p>
                    <Error message={this.state.errorMessage}/>
                </form>
            </div>


            <div className= { `${ this.state.detailsCard ? "payActive" : "payDisabled" }` } >
                <h1 className="payment__title">Payment</h1>
                <form className="form-group payment__form" onSubmit={this.onPaySubmit}>

                        <label>Credit Card Holder *</label>
                        <input className="form-control"  required  type="text" onChange={this.handleHolder} />
                    
                        <label>Credit Card Number *</label>
                        <input className="form-control"  required type="text" onChange={this.handleCardNum} />
                    
                        <div className="form-group payment__expiration">
                            <h2>Expiration Date *</h2>
                            <label>Month</label>
                            <select className="form-control" required onChange={this.handleExMonth}>
                                <option className="form-control" disabled selected ></option>
                                <option className="form-control" value="01">01</option>
                                <option className="form-control" value="02">02</option>
                                <option className="form-control" value="03">03</option>
                                <option className="form-control" value="04">04</option>
                                <option className="form-control" value="05">05</option>
                                <option className="form-control" value="06">06</option>
                                <option className="form-control" value="07">07</option>
                                <option className="form-control" value="08">08</option>
                                <option className="form-control" value="09">09</option>
                                <option className="form-control" value="10">10</option>
                                <option className="form-control" value="11">11</option>
                                <option className="form-control" value="12">12</option>
                            </select>

                            <label>Year</label>
                            <select className="form-control" required onChange={this.handleExYear}>
                                <option className="form-control" disabled selected ></option>
                                <option className="form-control" value="2018">2018</option>
                                <option className="form-control" value="2019">2019</option>
                                <option className="form-control" value="2020">2020</option>
                                <option className="form-control" value="2021">2021</option>
                                <option className="form-control" value="2022">2022</option>
                            </select>
                        </div>
                        
                        <label>CVC *</label>
                        <input className="form-control" required type="password" onChange={this.handleCVC} />
                        
                        <div className="form-group">
                            <button className="btn btn-primary btn-lg" type="submit">PAY</button>
                            <button className="btn-Payment btn btn-link" href="#" onClick={this.onGoBackToDetails}>Go Back</button>
                        </div>
                        <p className="required-fields">* (fields required)</p>
                        <Error message={this.state.errorMessage}/>
                </form>
            </div>

            { this.state.show &&
                <Popup place = {this.state.place} day = {this.state.day} month = {this.state.month} year = {this.state.year} time = {this.state.time} onClick={this.closePopup}/> }
          
    </div>
    }
}

export default withRouter(SetOrder)