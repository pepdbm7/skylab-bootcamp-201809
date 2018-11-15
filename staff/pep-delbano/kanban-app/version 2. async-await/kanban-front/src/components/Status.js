import React from 'react'


const Status = (props) => {

        return (
            <article className="columnStatus" onDrop={(e) => props.update(e, props.name)} onDragOver={(e) => e.preventDefault()} >
                <h1>{props.name}</h1>

                <div className="postits-side">{props.postits}</div> 
                
            </article>)

}

export default Status