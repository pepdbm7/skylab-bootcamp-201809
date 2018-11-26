import React from 'react'

const Total = (props) => {  //it just prints its father's state.total:
    // debugger
    return <article className="total_container">
           { props.calculatedTotal && <p className="total_description"> Total: { props.calculatedTotal } € </p> }
        </article>
}

export default Total