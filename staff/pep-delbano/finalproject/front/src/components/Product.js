import React, { Component } from 'react'

class Product extends Component {
    state = { id: this.props.id, name: this.props.name, image: this.props.image, description: this.props.description, price: this.props.price }

    render() {
        
        return <article className="product_container">
                <h2>{this.props.name}</h2>
                <img src={this.props.image} alt="product img" className="product_image" height="100px" width="100px"/>
                <p className="product_description">{this.props.description}</p> 
                <p className="product_price">{this.props.price}</p>
                { this.props.quantity > 1 &&
                <input className="product-quantity" disabled type="text" placeholder={this.props.quantity} />
                }

                {/* <button onClick={() => this.props.onAddProduct(this.props.id)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add</button> */}
                { this.props.remove && 
                    <button onClick={() => this.props.onDeleteMore(this.props.id)}><i className="fa fa-minus-circle" aria-hidden="true"></i> Remove</button>
                }
        </article>
    }
}

export default Product