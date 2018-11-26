import React, { Component } from 'react'
import Header from './Header'


//TODO: is it possible to do this with a dumb component instead??


class Thanks extends Component {

    render() { return( <div>
                        <Header/>
                        <article className="Thanks_container">
                            <h1 className="Thanks_title">Thanks, name! </h1>
                            <h1 className="Thanks_title">Thanks, name! </h1>
                            {/* <h1 className="Thanks_title">Thanks, { this.props.user.name }! </h1> */}
                        </article>
             </div>)
    }
}

export default Thanks