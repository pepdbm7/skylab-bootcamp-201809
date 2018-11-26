

export default class Grandparent extends React.Component {  //abuelo
  state = {counter: 5};
  
  updateGrandparent(value){
      this.setState({counter: value});
  }
  render() {
      return (
          <div>
              {/* <div>Grandparent: {this.state.counter}</div> */}

              <Parent updateGrandparent={this.updateGrandparent} />
          </div>
      );
  }
}




export class Parent extends React.Component{  //padre
  
  updateParent(value) {
      this.props.updateGrandparent(value);
  }

  render() {
      return(
          <div>
              {/* <div>Parent: {this.props.counter}</div> */}

              <ChildWithButton updateParent={this.updateParent} />
          </div>
      );
  }
}




export class ChildWithButton extends React.Component { //hijo
    
  handleClick(event) {
      this.props.updateParent(this.props.counter + 1);
  }

    render() {
        return(
            <div>
                {/* <div>Child: {this.props.counter}</div> */}

                <button onClick={this.handleClick}> Add 1 </button>
            </div>
          );
    }
}