import React, { Component } from "react";

export default class Book extends Component {
  render() {
    const { id, img, title, author } = this.props.info;
    const { handleDelete } = this.props;

    return (
      <article className="book">
        <img width="150" src={img} alt="book" />
        <div>
          <h4>Title : {title}</h4>
          <h6>author : {author}</h6>
          <button type="button" onClick={() => handleDelete(id)}>
            Delete me
          </button>
        </div>
      </article>
    );
  }
}
