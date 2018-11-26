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
            this.setState({ total: sum })}
          )
    } catch ({ message }) {
      alert(message) // HORROR! FORBIDDEN! ACHTUNG!
    }
  }


  handleClick = () => {
    const { products, total } = this.state

    const productsId = []
    productsId.push(products.map(_product => _product._id))
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

    return (
      <div>
        <Header />
        <div className="container_cart">

         {(this.state.products || []).map(product => {
          return <Product remove={true} key={product._id + Math.random()} id={product._id} name={product.name} image={product.image} price={product.price} description={product.description} quantity={product.quantity} onAddMore={this.handleAddMoreToCart} onDeleteMore={this.handleDeleteMoreFromCart} />
        })
      }

        <Total calculatedTotal={this.state.total}/>
          
          
        </div>

          <button className="btn btn-primary btn-lg" type="submit" onClick={this.handleClick}>NEXT</button>
      </div>
    )
  }
}


export default withRouter(Cart)