class InputForm extends React.Component {
    state = { text: '' }

    handleInput = event => {
        const text = event.target.value

        this.setState({ text })
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state.text)

        this.setState({ text: '' })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <textarea placeholder='Write your text...' value={this.state.text} onChange={this.handleInput}></textarea>
            <button type='submit'>Create</button>
        </form>
    }
}

function PostIt(props) {
    return <div className='postIt'>
        <article >{props.paint}</article>
        <button className='postIt__button' type='button' onClick={() => {props.onClick(props.index)}} >X</button>
    </div>
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { inputText: [] }
    }

    handleSubmit = text => {
        this.setState(prevState => ({
            inputText: [...prevState.inputText, text]
        }))
    }

    handleClick = key => {
        // const inputText = this.state.inputText.splice(this.state.inputText[key])
        const newArr1 = this.state.inputText.slice(0, key)
        const newArr2 = this.state.inputText.slice(key+1)
        const inputText = newArr1.concat(newArr2)
        this.setState({inputText})
    }

    render() {
        return <section className='main-section'>
            <h1>Post-It App</h1>

            <InputForm onSubmit={this.handleSubmit} />

            <section className='postit-board'>
                {this.state.inputText.map((x, index) => <PostIt paint={x} key={x} index={index} onClick={index => this.handleClick(index)}/>)}
            </section>
        </section >
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
