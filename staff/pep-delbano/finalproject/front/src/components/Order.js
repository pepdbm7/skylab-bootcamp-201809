import React, { Component } from 'react'

class Order extends Component {
    state = { orders: [] }

    //TO DO everything!: receive with props from father (cart) the user.orders, to print them

    render() {
        
        return <article className="order_container">
                <h2>Orders</h2>
                <p className="order_description">{this.props.description}</p> 
                <p className="order_price">{this.props.price}</p>
                { this.props.quantity > 1 &&
                <input className="order-quantity" disabled type="text" placeholder={this.props.quantity} />
                }

                <button onClick={() => this.props.onAddorder(this.props.id)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add</button>
        </article>
    }
}

export default Order