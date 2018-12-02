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
      console.log(message)
    }
  }

  render() {
    //le pasamos al hijo Product por props los fields q necesitará imprimir dl objeto q tenemos en l state
    return (
      <div className="home__page">
        <Header home={true} profile={false} contact={false} cart={false} vieworders={false} />
        <div className="home__container">
          <h1 className="home__title">OUR PRODUCTS</h1>
          <hr className="home__line"/>
          <section className="home__products-container">
                      <div className="home__type-container">
                            <h1 className="home__type-title-sandwich" >SANDWICHES</h1>
                            <div className="home__products-container">{this.state.products.filter(product => product.type === 'sandwich').map(product => <Product addFromHome={true} remove={false} addMore={false} id={product.id} name={product.name} image={product.image} price={product.price} description={product.description} addFromHome={this.handleAddToCart} />)}</div>
                      </div>

                      <div className="home__type-container">
                            <h1 className="home__type-title-salads" >SALADS</h1>
                            <div className="home__products-container">{this.state.products.filter(product => product.type === 'salad').map(product => <Product addFromHome={true} remove={false} addMore={false} id={product.id} name={product.name} image={product.image} price={product.price} description={product.description} addFromHome={this.handleAddToCart} />)}</div>
                      </div>

                      <div className="home__type-container">
                            <h1 className="home__type-title-juices" >JUICES</h1>
                            <div className="home__products-container">{this.state.products.filter(product => product.type === 'juice').map(product => <Product addFromHome={true} remove={false} addMore={false} id={product.id} name={product.name} image={product.image} price={product.price} description={product.description} addFromHome={this.handleAddToCart} />)}</div>
                      </div>

                      <div className="home__type-container">
                            <h1 className="home__type-title-yogurts" >YOGURTS</h1>
                            <div className="home__products-container">{this.state.products.filter(product => product.type === 'yogurt').map(product => <Product addFromHome={true} remove={false} addMore={false} id={product.id} name={product.name} image={product.image} price={product.price} description={product.description} addFromHome={this.handleAddToCart} />)}</div>
                      </div>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)