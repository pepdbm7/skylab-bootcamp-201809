import React, { Component } from 'react'

class Product extends Component {
    state = { id: this.props.id, name: this.props.name, image: this.props.image, description: this.props.description, price: this.props.price }

    render() {
        
        return <article className="product__container">
                <h2 className="product__name">{this.props.name}</h2>
                <img src={this.props.image} alt="product img" className="product__image"/>
                <p className="product__description">{this.props.description}</p> 
                <p className="product__price">{this.props.price} <i className="fas fa-euro-sign" /></p>

                {/* only shown in home: */}
                { this.props.addFromHome &&
                    <div onClick={() => this.props.addFromHome(this.props.id)}><i className="fa fa-plus-circle product__button--addToCart" aria-hidden="true" /></div>
                }


                {/* only shown in chart: */}
                { this.props.remove && 
                    <div className="product__quantityController">
                    <div onClick={() => this.props.onDeleteMore(this.props.id)}><i className="fa fa-minus-circle product__button--minus" aria-hidden="true"></i></div>

                { this.props.quantity &&
                    <input className="product__quantity" disabled type="text" placeholder={`x ${this.props.quantity}`} />
                }


                { this.props.addMore &&
                    <div onClick={() => this.props.addMore(this.props.id)}><i className="fa fa-plus-circle product__button--plus" aria-hidden="true" /></div>
                }
                </div>}

        </article>
    }
}

export default Product