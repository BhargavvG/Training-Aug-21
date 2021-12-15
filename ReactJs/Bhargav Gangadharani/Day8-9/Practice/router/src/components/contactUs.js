import React from "react";
import { useParams } from "react-router-dom";
export default function Contact() {
  let { id } = useParams();
  return (
    <div>
      <h1>Contact</h1>
      <h1>ID: {id}</h1>
    </div>
  );
}
