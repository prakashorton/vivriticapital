import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Todo from "./components/todo";
import GoodBook from "./components/goodBook";
import { Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Route path="/" exact component={Todo}></Route>
        <Route path="/books" component={GoodBook}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
