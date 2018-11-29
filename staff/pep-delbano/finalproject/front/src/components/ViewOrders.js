import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import logic from '../logic'

class ViewOrders extends Component {
    state = { orders: [] }

    componentDidMount = () => {
        logic.deleteUnfinishedOrders()
            .then(() => logic.retrieveOrders())
            .then(res => //res es el array de ordenes con sus productos
                this.setState({ orders:  res }))
                // .then(() => logic.getProductsDetailedFromOrders({ this.state.products })) //con un populate lo hacemos directamente (Mongoose)
    }
    //TO DO everything!: receive with props from father (cart) the user.orders, to print them

    render() {        
        return( <div className="orders__page">
            <Header/>
            <article className="orders__container">
                <h1>Orders history</h1>
                
                {(this.state.orders || []).map(order => {
                    return <Order key={order._id + Math.random()} products={order.products} day={order.day} total={order.total} place={order.place} month={order.month} year={order.year} time={order.time} comments={order.comments} />
                })}
            </article>
        </div> )
    }
}

export default ViewOrders