import React, {Component} from 'react';
import SearchConnectionsInputField from '../components/SearchConnectionsInputField';
import ConnectionsService from '../services/ConnectionsService';

export default class SearchConnections extends Component {
  constructor() {
    super();
    this.state = {
      "from": "Tamedia AG, Werdstrasse 21, 8004 Zürich",
      "to": "Biel/Bienne BSG",
      "connectionsData": []
    }
  }
  setFrom = event =>{
    this.setState({from: event.target.value})
  }
  setTo = event => {
    this.setState({to: event.target.value})
  }
  fetchConnections = async() => {
    const connectionsResponse = await ConnectionsService.fetchConnections({from: this.state.from, to: this.state.to});
    console.log(connectionsResponse.data);
    this.setState({connectionsData: connectionsResponse.data});
  }
  getTripDuration = (connection) => {
    var diff = new Date(connection.steps.slice(-1)[0].arrival.time).getTime() - new Date(connection.steps[0].departure.time).getTime();
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    return hh + ":" + mm;
  }
  formatTime = date =>{ 
    if(!date) {
      return null;
    }
    return new Date(date).getHours() + ':' + new Date(date).getMinutes();
  }
  getJourneyIconType = type => {
    switch(type.toLowerCase()) {
      case 't':
        return 'tram.png';
      case 'walk':
        return 'walk.png';
      case 'ic':
        return 'train.png';
      case 'ship':
        return 'ship.png';
      case 'cableway':
        return 'cableway.png';
      case 'bus':
        return 'bus.png';
      case 'nfb':
        return 'bus.png';
      default:
        return null;
    }
  }
  render() {
    return (
      <section className="container home mt-5">
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
            onClick={this.fetchConnections}
          >
              Find
          </button>
          { this.state.connectionsData.connections? 
            <div id="accordion">
           {this.state.connectionsData.connections.map((connection, index) => {
              return  (<div className="card" key={index}> 
                <div className="card-header">
                  <a className="card-link collapsed" aria-expanded="false" expanded="false" data-toggle="collapse" href={'#connection' + index}>
                    <p className="m-0 text text-center">
                      <span className="mr-2">Departure:</span> 
                      <span className="mr-1">{new Date(connection.steps[0].departure.time).getHours()}:{new Date(connection.steps[0].departure.time).getMinutes()}</span>
                      <span>({connection.steps[0].departure.place})</span>
                    </p>
                    <p className="m-0 text-center">
                      <span className="mr-2">Arrival:</span> 
                      <span className="mr-1">{new Date(connection.steps.slice(-1)[0].arrival.time).getHours()}:{new Date(connection.steps.slice(-1)[0].arrival.time).getMinutes()}</span>
                      <span>({connection.steps.slice(-1)[0].arrival.place})</span>
                    </p>
                    <p className="m-0 text-center">Duration: {this.getTripDuration(connection)}</p>
                  </a>
                </div>
                <div id={'connection' + index} className="collapse" data-parent="#accordion"> 
                  <div className="card-body">
                    <h5>Steps</h5>
                    { !connection.steps? '': 
                      connection.steps.map((step, index) => {
                        return <div key={index}>
                          <table className="table">
                            <thead className="thead-dark">
                              <tr>
                                <th className="text-center" scope="col">#</th>
                                <th className="text-center" scope="col">Time</th>
                                <th className="text-center" scope="col w-75">Connection</th>
                                <th className="text-center" scope="col">Journey type</th>
                              </tr>
                            </thead>
                            <tbody 
                              data-toggle="collapse" 
                              data-target={'#connectionDetails' + index} 
                              aria-expanded="false" 
                              aria-controls={'connectionDetails' + index}
                              className="cursor-pointer"
                            >
                              <tr>
                                <th className="text-center" scope="row">{ index + 1 }</th>
                                <td className="text-center">{ this.formatTime(step.departure.time) }</td>
                                <td className="text-center w-75">{ step.departure.place }</td>
                                <th className="text-center" scope="col">
                                  { !this.getJourneyIconType(step.type)? '' : 
                                    <img width="30px" src={'/icons/' + this.getJourneyIconType(step.type)}></img>
                                  }
                                </th>
                              </tr>
                              <tr>
                                <th className="text-center" scope="row">{ index + 1 }</th>
                                <td className="text-center">{ this.formatTime(step.arrival.time) }</td>
                                <td className="text-center w-75">{ step.arrival.place }</td>
                                <th className="text-center" scope="col">
                                  { step.walk && step.type === 'walk'? step.walk + 'm' : '' }
                                </th>
                              </tr>
                            </tbody>
                          </table>
                          { step.stations.length === 0? '': 
                          <table className="table collapse" id={'connectionDetails' + index}>
                          <thead className="bg-info">
                              <tr>
                                <th className="text-center" scope="col">#</th>
                                <th className="text-center" scope="col w-75">Station</th>
                                <th className="text-center" scope="col">Time</th>
                              </tr>
                            </thead>
                            <tbody data-toggle="collapse" data-target={'#connectionDetails' + index} aria-expanded="false" aria-controls={'connectionDetails' + index}>
                            {
                                step.stations.map((station, index) => {
                                  return (
                                      <tr key={index}>
                                        <th className="text-center" scope="col">{ index + 1 }</th>
                                        <th className="text-center" scope="col">{ station.name }</th>
                                        <th className="text-center" scope="col">{ this.formatTime(station.departure) }</th>
                                      </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                          }
                        </div>
                    })
                   }
                  </div>
                </div>
              </div>)
              })}
            </div>
           : '' 
          
          }
          {this.connectionsList}
      </section>
    );
  }
}