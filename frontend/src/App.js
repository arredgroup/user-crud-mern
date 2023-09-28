import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserList from "./pages/users/UserList";

class App extends Component {
  render() {
    return (
      <div>
        <h1>React App</h1>
        <UserList />
      </div>
    );
  }
}

export default App;
