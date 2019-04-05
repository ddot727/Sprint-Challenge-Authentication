import React from "react";
import axios from "axios";
import requiresAuth from "../auth/requiresAuth";

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <div>
        <h2>List of Jokes</h2>
        {this.state.jokes.map(joke => (
          <p>{joke.joke}</p>
        ))}
      </div>
    );
  }

  componentDidMount() {
    const endpoint = "/jokes";
    axios
      .get(endpoint)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default requiresAuth(Jokes);
