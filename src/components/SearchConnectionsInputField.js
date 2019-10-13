import React, {Component} from 'react';

export default class SearchConnectionsInputField extends Component {
  render() {
    return (
      <div>
          <div className="input-group mb-3">
              <input type="text" 
                     placeholder={this.props.message} 
                     value={this.props.defaultValue}
                     className="form-control" 
                     aria-describedby="basic-addon3"
                     onChange={this.props.update}
              />
          </div>  
      </div>
    );
  }
}