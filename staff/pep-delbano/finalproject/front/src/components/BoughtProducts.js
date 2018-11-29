import React from 'react'

const BoughtProducts = (props) => {
    // state = { type: props.type, name: props.name, price: props.price }

        return <article className="product__container">
                    <h2 className="product__name">{props.name}</h2>
                    <p className="product__type">{props.type}</p>

                    { props.quantity ? <p className="product__price">{props.price} € x {props.quantity}</p>
                    : <p className="product__price">{props.price} €</p> }
                </article>
}

export default BoughtProducts