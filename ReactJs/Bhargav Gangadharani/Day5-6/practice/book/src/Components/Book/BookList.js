import React, { Component } from "react";
// import Book from "./Book";
import Book from "./conditionalJsxBook";
import booksData from "./BookData";

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: booksData,
    };
  }

  handleDelete = (id) => {
    const remainingBooks = this.state.books.filter((item) => item.id !== id);
    this.setState({ books: remainingBooks });
  };

  render() {
    return (
      <section>
        {this.state.books.map((item) => (
          <Book
            key={item.id}
            info={item}
            handleDelete={this.handleDelete}
          ></Book>
        ))}
      </section>
    );
  }
}
