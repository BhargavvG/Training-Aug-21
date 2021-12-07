import React from "react";
import StudentIdCardsList from "./Components/StudentIdCardsList";
import "./App.css";

export default function App() {
  return (
    <div className="container bg-light border border-primary rounded my-5 p-5 text-center">
      <h1 className="display-4">Assignment</h1>
      <p className="lead">
        * Reference to day2 assignment, StudentID Card Should contain delete
        button and should delete remove that from booklist component. Need to
        use the concept passing methods to children.
        <br></br>* Add one toggle button in StudentIdCard Component, implement
        toggle functionality using ternary operator in JSX.
      </p>
      <StudentIdCardsList className="row"></StudentIdCardsList>
    </div>
  );
}
