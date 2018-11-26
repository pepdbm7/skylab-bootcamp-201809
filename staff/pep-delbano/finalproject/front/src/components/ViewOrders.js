import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'

class Orders extends Component {
    state = { orders: [] }

    //TO DO everything!: receive with props from father (cart) the user.orders, to print them

    render() {        
        return( <div>
            <Header/>
            <article className="orders_container">
                <h1>Orders history</h1>
                <h1>Orders history</h1>
                
                {(this.state.orders || []).map(order => {
                    return <Order key={order._id + Math.random()} id={order._id} date={order.date} place={order.place} products={order.products} />
                })}
            </article>
        </div> )
    }
}

export default Orders