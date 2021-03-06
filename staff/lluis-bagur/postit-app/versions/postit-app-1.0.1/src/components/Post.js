import React, { Component } from 'react'

class Post extends Component {
    state = { text: this.props.text }


    handleChange = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleBlur = () => {
        this.props.onUpdatePost(this.props.id, this.state.text)
    }

    render() {
        console.log('Post', '"render"')

        return <article className="post">
            <textarea className="postit" defaultValue={this.state.text} onChange={this.handleChange} onBlur={this.handleBlur} />

            <button onClick={() => this.props.onDeletePost(this.props.id)}><i className="fas fa-ban"></i></button>
        </article>
    }
}

export default Post