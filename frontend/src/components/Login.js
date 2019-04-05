import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username" />
          <input
            value={this.state.username}
            onChange={this.handleChange}
            id="username"
            name="username"
            type="text"
            placeholder="Enter Username"
          />
          <input
            value={this.state.password}
            onChange={this.handleChange}
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
          />
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:3300/api/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/jokes");
      })
      .catch(error => {
        console.log("LOGIN ERROR:", error);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default Login;
