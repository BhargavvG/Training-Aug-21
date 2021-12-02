import React from "react";

const Books = () => {
  return (
    <div className="Books">
      <Book></Book>
      <Book></Book>
      <Book></Book>
    </div>
  );
};

const Book = () => {
  return (
    <article className="book">
      <CoverImg></CoverImg>
      <Title></Title>
      <Author></Author>
    </article>
  );
};

const CoverImg = () => {
  return (
    <img
      width="200"
      src="https://www.booksgoat.com/image/cache/catalog/product/BooksImg1/8191013401-600x770.jpg"
    ></img>
  );
};

const Title = () => {
  return <h1 style={{ color: "blue" }}>The Scam 1992</h1>;
};
const AuthorStyle = {
  fontSize: "1.5rem",
  color: "gray",
};
const Author = () => {
  return <p style={AuthorStyle}>by Harshad Mehta</p>;
};

export default Books;
