import React, { Component } from "react";

export default class Book extends Component {
  render() {
    const { img, title, author } = this.props.info;

    return (
      <article className="book float-start">
        <img width="150" src={img} alt="book" />
        <div>
          <h4>Title : {title}</h4>
          <h6>author : {author}</h6>
        </div>
      </article>
    );
  }
}
