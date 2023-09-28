import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Count from "./components/count/count";


class App extends Component {
  render() {
    return (
      <div>
        <h1>React App</h1>
        <Count />
      </div>
    );
  }
}

export default App;
