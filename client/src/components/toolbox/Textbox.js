import React, { Component, Fragment } from 'react';
import '../../index.css';
class Textbox extends Component {
  render() {
    const { type, placeholder, name, value, onChange } = this.props;
    return (
      <Fragment>
        <div className="input-group mb-2 mt-1">
          <input
            className="textbox-green form-control"
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        </div>
      </Fragment>
    );
  }
}
export default Textbox;
