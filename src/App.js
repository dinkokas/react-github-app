import React, { Component } from "react";
import Nav from "./components/Nav";
import Search from "./components/Search";
import Footer from "./components/Footer";

export class App extends Component {
  render() {
    return (
      <div className="container">
        <Nav />
        <Search />
        <Footer />
      </div>
    );
  }
}
export default App;
