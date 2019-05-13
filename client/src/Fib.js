import React, { Component } from 'react'; // import react and component from react
import axios from 'axios';

class Fib extends Component { //extending the component base class
  state = {
    seenIndexes: [], //array
    values: {}, // empty object
    index: '' // empty string
  };

// fetch data from backend api with two helper methods. Define a component then the methods.
  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

// define helper method fetchVales
  async fetchValues() { //asynchronous method
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

// define helper method fetchIndexes. kind of a hard coded copy of all indexes seen so far.
  async fetchIndexes(){
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

// capture user input
handleSubmit = async (event) => { //bound function
  event.preventDefault();

  await axios.post('/api/values', {
    index: this.state.index // set index to value typed by user
  });
  this.setState({ index '' }); //set back to empty
};

// iterate over every object in the seenIndexes array and just pull out the list of numbers we want to display
// the .join will format the output with a comma and space characters.
  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

// helper method for rendering values from redis. Pulling back an object with key:value pairs.
//
  renderValues() {
    const entries = []; //array called entries

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
         </div>
      );
    }

    return entries;
  }

  // render the form for the user
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
           />
          <button>Submit</button>
        </form>

        <h3>Index I have seen already:</h3>
        {this.renderSeenIndexes()} //helper method

        <h3>Calculated Values:</h3>
        {this.renderValues()} //helper method
      </div>

    );
  }
}

export default Fib;
