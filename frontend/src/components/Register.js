import React from "react";
import axios from "axios";

class Register extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
              name="username"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
              name="password"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </>
    );
  }

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:3300/api/register";
    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log("REGISTER ERROR:", error);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default Register;
