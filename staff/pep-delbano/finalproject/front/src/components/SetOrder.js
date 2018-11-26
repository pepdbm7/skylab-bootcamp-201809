import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../logic'



class SetOrder extends Component {

    state = { error: null, place: '', day:'', month:'', year:'', time: '', comments:'' }

    onGoBack = () => {

        logic.deleteUnfinishedOrders() //TODO!!!!
        this.props.history.push('/cart')
    }



    handleAddress = (value) => {
        this.setState({
            place: value
        });
    }

    handleDay = (value) => {
        this.setState({
            day: value
        });
    }

    handleMonth = (value) => {
        this.setState({
            month: value
        });
    }

    handleYear = (value) => {
        this.setState({
            year: value
        });
    }

    handleComment = (value) => {
        this.setState({
            comments: value
        });
    }

    handleTime = (value) => {
        this.setState({
            time: value
        });
    }

    handleSubmit = () => {
        const { place, day, month, year, time, comments } = this.state
        debugger
        try {
            logic.addDroppingDetails(place, day, month, year, time, comments)
                debugger
            this.props.history.push('/payment')
        } catch ({ message }) {
            alert(message)
        }
    }

    // handleSubmit = () => {
    //     const { place, day, month, year, comments } = this.state
    //     try {
    //         this.props.sendPlaceToApp(place)
    //         this.props.sendDayToApp(day)
    //         this.props.sendMonthToApp(month)
    //         this.props.sendYearToApp(year)
    //         this.props.sendCommentToApp(comments)
    //             debugger
    //         this.props.history.push('/payment')
    //         debugger
    //     } catch ({ message }) {
    //         alert(message)
    //     }
    // }


    render() {
        return <div className="container-OrderDate">
                <h1 className="OrderDate-title">Dropping details</h1>
                <form className="form-group form-OrderDate" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <h2>Where do you want it?</h2>
                        <input className="form-control OrderDate" type="text" placeholder="Write an address here..." onChange={this.handleAddress} />
                    </div>

                    <div className="form-group">
                        <h2>Choose a date and a time frame</h2>
                        <label>Day</label>
                        <select className="form-control" required onChange={this.handleDay}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="Day">1</option>
                            <option className="form-control" value="Day">2</option>
                            <option className="form-control" value="Day">3</option>
                            <option className="form-control" value="Day">4</option>
                            <option className="form-control" value="Day">5</option>
                            <option className="form-control" value="Day">6</option>
                            <option className="form-control" value="Day">7</option>
                            <option className="form-control" value="Day">8</option>
                            <option className="form-control" value="Day">9</option>
                            <option className="form-control" value="Day">10</option>
                            <option className="form-control" value="Day">11</option>
                            <option className="form-control" value="Day">12</option>
                            <option className="form-control" value="Day">13</option>
                            <option className="form-control" value="Day">14</option>
                            <option className="form-control" value="Day">15</option>
                            <option className="form-control" value="Day">16</option>
                            <option className="form-control" value="Day">17</option>
                            <option className="form-control" value="Day">18</option>
                            <option className="form-control" value="Day">19</option>
                            <option className="form-control" value="Day">20</option>
                            <option className="form-control" value="Day">21</option>
                            <option className="form-control" value="Day">22</option>
                            <option className="form-control" value="Day">23</option>
                            <option className="form-control" value="Day">24</option>
                            <option className="form-control" value="Day">25</option>
                            <option className="form-control" value="Day">26</option>
                            <option className="form-control" value="Day">27</option>
                            <option className="form-control" value="Day">28</option>
                            <option className="form-control" value="Day">29</option>
                            <option className="form-control" value="Day">30</option>
                            <option className="form-control" value="Day">31</option>
                        </select>

                        <label>Month</label>
                        <select className="form-control" required onChange={this.handleMonth}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="Month">January</option>
                            <option className="form-control" value="Month">February</option>
                            <option className="form-control" value="Month">March</option>
                            <option className="form-control" value="Month">April</option>
                            <option className="form-control" value="Month">May</option>
                            <option className="form-control" value="Month">June</option>
                            <option className="form-control" value="Month">July</option>
                            <option className="form-control" value="Month">August</option>
                            <option className="form-control" value="Month">September</option>
                            <option className="form-control" value="Month">October</option>
                            <option className="form-control" value="Month">November</option>
                            <option className="form-control" value="Month">December</option>
                        </select>

                        <label>Year</label>
                        <select className="form-control" required onChange={this.handleYear}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="Year">2018</option>
                            <option className="form-control" value="Year">2019</option>
                            <option className="form-control" value="Year">2020</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Time Frame</label>
                        <select className="form-control" required onChange={this.handleTime}>
                            <option className="form-control" disabled selected > -- </option>
                            <option className="form-control" value="Hour Frame">07:00 - 07:30</option>
                            <option className="form-control" value="Hour Frame">07:30 - 08:00</option>
                            <option className="form-control" value="Hour Frame">08:00 - 08:30</option>
                            <option className="form-control" value="Hour Frame">08:30 - 09:00</option>
                            <option className="form-control" value="Hour Frame">09:00 - 09:30</option>
                            <option className="form-control" value="Hour Frame">09:30 - 10:00</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <h2>Add more details</h2>
                        <textarea className="form-control OrderDate" type="text" placeholder="Write a comment..." onChange={this.handleComment} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" type="submit">NEXT</button>
                        <button className="btn-OrderDate btn btn-link" href="#" onClick={this.onGoBack}>Go Back</button>
                    </div>
        
                </form>
            </div>
    }
}

export default withRouter(SetOrder)