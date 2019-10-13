import React, {Component} from 'react';
import SearchConnectionsInputField from'../components/SearchConnectionsInputField';

export default class SearchConnections extends Component {
  constructor() {
    super();
    this.state = {
      "from": "Tamedia AG, Werdstrasse 21, 8004 Zürich",
      "to": "Biel/Bienne BSG"
    }
  }
  setFrom = event =>{
    this.setState({from: event.target.value})
  }
  setTo = event => {
    this.setState({to: event.target.value})
  }
  disableFindButton() {
    return this.state.from.length > 0 && this.state.to.length > 0;
  }
  render() {
    return (
      <section className="container home mt-5">
          <p>{this.state.from}</p>
          <p>{this.state.to}</p>
          <SearchConnectionsInputField 
            message="From" 
            update={this.setFrom} 
            defaultValue={this.state.from}
          />
          <SearchConnectionsInputField 
            message="To"  
            update={this.setTo} 
            defaultValue={this.state.to}
          />
          <button 
            type="button" 
            className="btn btn-primary" 
            disabled={this.state.from.length === 0 || this.state.to.length === 0}
          >
              Find
          </button>
      </section>
    );
  }
}