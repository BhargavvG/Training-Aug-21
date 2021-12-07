import React, { Component } from "react";

export default class form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
    };
  }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    alert(
      `First name: ${this.state.firstName}   Last name: ${this.state.lastName}`
    );
  };

  render() {
    return (
      <div>
        <div className="container bg-light border border-primary rounded my-5 p-5">
          <form onSubmit={this.handleSubmit}>
            <label className="form-label">First Name: </label>
            <input
              className="form-control"
              type="text"
              name="firstName"
              onChange={this.handleInput}
            />
            <label className="form-label">Last Name: </label>
            <input
              className="form-control"
              type="text"
              name="lastName"
              onChange={this.handleInput}
            />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
