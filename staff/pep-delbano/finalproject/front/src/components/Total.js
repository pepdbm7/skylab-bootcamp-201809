import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const Total = (props) => {  //it just prints its father's state.total:
    // debugger

    return <article className="total__container">
          <p className="total__message">Total: { props.calculatedTotal } <i className="fas fa-euro-sign" /> </p>
        </article>
}

export default Total