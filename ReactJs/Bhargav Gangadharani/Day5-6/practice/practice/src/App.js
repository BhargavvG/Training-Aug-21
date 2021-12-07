import "./App.css";
import "./Products";
import Products from "./Products";
import React, { useState } from "react";

// UseState

function App() {
  const [childcartlist, setCartList] = useState([]);
  function handleCallback(cartlist) {
    setCartList(cartlist);
  }
  return (
    <div className="App">
            <h1>Total Items in Cart {childcartlist.length}</h1>
            <Products childnotify={handleCallback}></Products>
         
    </div>
  );
}
export default App;
