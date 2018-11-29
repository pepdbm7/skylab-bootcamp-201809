import React, { Component } from 'react'
import Header from './Header'
import Product from './Product'
import { withRouter } from 'react-router-dom';
// import { Container, Row, Col, Card, CardImage, CardBody, CardTitle, CardText, CardFooter, Fa, Tooltip, Badge, Button } from 'mdbreact';
import logic from '../logic'


class Home extends Component {
  state = { products: [] }

  componentDidMount() {
    logic.listAllProducts()
      .then(products =>this.setState({ products }) )
    // TODO error handling!
  }


  handleAddToCart = (id) => {
    try {
      logic.addProductToCart(id)
    } catch ({ message }) {
      alert(message) // HORROR! FORBIDDEN! ACHTUNG!
    }
  }

  render() {
    //le pasamos al hijo Product por props los fields q necesitará imprimir dl objeto q tenemos en l state
    return (
      <div>
        <Header />
        <div className="container_home">
          {this.state.products.map(product => <Product add={true} remove={false} key={product._id + Math.random()} id={product._id} name={product.name} image={product.image} price={product.price} description={product.description} onAddProduct={this.handleAddToCart} />)}
        </div>
      </div>
    )
  }
}

export default withRouter(Home)