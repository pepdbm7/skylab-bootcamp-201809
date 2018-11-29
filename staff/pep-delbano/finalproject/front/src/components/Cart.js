import React, { Component } from 'react'
import Header from './Header'
import Product from './Product'
import Total from './Total'
import { withRouter } from 'react-router-dom';
import logic from '../logic'


class Cart extends Component {
  state = { products: [], total: '' }  //array con obj d productos, con todos sus fields (quantity, name, etc)

  componentDidMount() {
    let sum = 0

    logic.listCartProducts()
      .then(products => { this.setState({ products }) })  //metemos en state los productos filtrados con la lógica, y luego renderizaremos lo dl state
      .then( () => {
          (this.state.products).map(product => {
            sum += product.price
          })
          sum = sum.toFixed(2)
          this.setState({ total: sum })}
          )
      // TODO error handling!
  }

  handleAddMoreToCart = () => {
    //TODO logica para ++ product.quantity
  }

  handleDeleteMoreFromCart = (id) => {
    //TODO logica para -- product.quantity
    try {
      let sum = 0

      logic.removeProductFromCart(id)
          .then(() => logic.listCartProducts())
          .then(products => this.setState({ products }))
          .then( () => {
            (this.state.products).map(product => {
              sum += product.price
            })
            sum = sum.toFixed(2)
            this.setState({ total: sum })}
          )
    } catch ({ message }) {
      alert(message) // HORROR! FORBIDDEN! ACHTUNG!
    }
  }


  handleClick = () => {
    const { products, total } = this.state

    const productsId = products.map(_product => _product._id)
    
    const totalstr = total.toString()

    try {
      logic.createNewOrder(productsId, totalstr)
      
      //  .then(() => {
         this.props.history.push('/setorder')
        // })
    } catch ({ message }) {
      alert(message)
    }
  }



  render() {

    return ( <div className="cart__page">
            <Header />
            <div className="cart__container">
                { this.state.products.filter(product => product.type === 'sandwich').length &&
                  <div className="cart__type-container">
                        <h1 className="cart__type-title-sandwich" >SANCWICHES</h1>
                        <div className="cart__products-container">{this.state.products.filter(product => product.type === 'sandwich').map(product => <Product add={false} remove={true} key={product._id + Math.random()} id={product._id} name={product.name} image={product.image} price={product.price} description={product.description} quantity={product.quantity} onAddMore={this.handleAddMoreToCart} onDeleteMore={this.handleDeleteMoreFromCart} />)}</div>
                  </div> }

                { this.state.products.filter(product => product.type === 'salad').length &&
                  <div className="cart__type-container">
                        <h1 className="cart__type-title-salads" >SALADS</h1>
                        <div className="cart__products-container">{this.state.products.filter(product => product.type === 'salad').map(product => <Product add={false} remove={true} key={product._id + Math.random()} id={product._id} name={product.name} image={product.image} price={product.price} description={product.description} quantity={product.quantity} onAddMore={this.handleAddMoreToCart} onDeleteMore={this.handleDeleteMoreFromCart} />)}</div>
                  </div> }

                { this.state.products.filter(product => product.type === 'yogurt').length &&
                  <div className="cart__type-container">
                        <h1 className="cart__type-title-yogurts" >YOGURTS</h1>
                        <div className="cart__products-container">{this.state.products.filter(product => product.type === 'yogurt').map(product => <Product add={false} remove={true} key={product._id + Math.random()} id={product._id} name={product.name} image={product.image} price={product.price} description={product.description} quantity={product.quantity} onAddMore={this.handleAddMoreToCart} onDeleteMore={this.handleDeleteMoreFromCart} />)}</div>
                  </div> }

                  { this.state.products.filter(product => product.type === 'juice').length &&
                  <div className="cart__type-container">
                        <h1 className="cart__type-title-juices" >JUICES</h1>
                        <div className="cart__products-container">{this.state.products.filter(product => product.type === 'juice').map(product => <Product add={false} remove={true} key={product._id + Math.random()} id={product._id} name={product.name} image={product.image} price={product.price} description={product.description} quantity={product.quantity} onAddMore={this.handleAddMoreToCart} onDeleteMore={this.handleDeleteMoreFromCart} />)}</div>
                  </div> }
            </div>
              
            <div className="cart__footer">
                { this.state.total !== 0 && <Total calculatedTotal={this.state.total}/> }
                <button className="btn btn-primary btn-lg cart__submit-button" type="submit" onClick={this.handleClick}>NEXT</button>
            </div>
      </div> )
    }
}


export default withRouter(Cart)