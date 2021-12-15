import React from "react";
import "./App.css";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contactUs";

export default function App() {
  const navigate = useNavigate();
  const id = 1;
  return (
    // <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact/3">Contact</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>
      <button
        type="button"
        onClick={() => {
          // event.preventDefault();
          navigate(`/contact/${id}`, { replace: true });
        }}
      >
        Navigate
      </button>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/contact/:id" element={<Contact />}></Route>
        <Route exact path="/about" element={<About />}></Route>
      </Routes>
    </div>
    // </Router>
  );
}
