import React, { Component } from "react";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: true,
    };
  }

  handleInfo = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  render() {
    const { id, img, title, author } = this.props.info;

    const checkInfo = (info) => {
      if (info === true) {
        return (
          <>
            <h5>Description: </h5>
            <p>Lorem ipsum dolor sit amet, consectet</p>
          </>
        );
      } else {
        return null;
      }
    };

    return (
      <article className="book">
        <img width="150" src={img} alt="book" />
        <div>
          <h4>Title : {title}</h4>
          <h6>author : {author}</h6>
          <button type="button" onClick={this.handleInfo}>
            Toggle Description
          </button>
          {/* 3 Ways to toggle description*/}

          {/* 1 => By Calling Function */}
          {/* {checkInfo(this.state.showInfo)} */}

          {/* 2 => By And operator */}
          {/* {this.state.showInfo && (
              <>
                <h5>Description: </h5>
                <p>Lorem ipsum dolor sit amet, consectet</p>
              </>
            )} */}

          {/* 3 => By Ternary Operator */}
          {this.state.showInfo ? (
            <>
              <h5>Description: </h5>
              <p>Lorem ipsum dolor sit amet, consectet</p>
            </>
          ) : null}
        </div>
      </article>
    );
  }
}
