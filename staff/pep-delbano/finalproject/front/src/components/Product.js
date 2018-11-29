import React, { Component } from 'react'

class Product extends Component {
    state = { id: this.props.id, name: this.props.name, image: this.props.image, description: this.props.description, price: this.props.price }

    render() {
        
        return <article className="product__container">
                <h2 className="product__name">{this.props.name}</h2>
                <img src={this.props.image} alt="product img" className="product__image" height="100px" width="100px"/>
                <p className="product__description">{this.props.description}</p> 
                <p className="product__price">{this.props.price} <i className="fas fa-euro-sign" /></p>
                { this.props.quantity > 1 &&
                <input className="product__quantity" disabled type="text" placeholder={this.props.quantity} />
                }

                { this.props.add &&
                <button onClick={() => this.props.onAddProduct(this.props.id)}><i className="fa fa-plus-circle" aria-hidden="true" /> Add</button>
                }
                { this.props.remove && 
                    <button onClick={() => this.props.onDeleteMore(this.props.id)}><i className="fa fa-minus-circle" aria-hidden="true"></i> Remove</button>
                }
        </article>
    }
}

export default Product