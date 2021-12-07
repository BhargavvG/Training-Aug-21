import React, { Component } from "react";

export default class StudentIdCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStudent: true,
    };
  }

  minimize = () => {
    this.setState({ showStudent: !this.state.showStudent });
  };

  render() {
    const { handleDelete, student, college, children } = this.props;

    return (
      <section className="text-center col-4">
        <div className="idcard rounded p-4 pb-5 mx-auto my-5 bg-white">
          <Navigate
            handleDelete={handleDelete}
            student={student}
            minimize={this.minimize}
            showStudent={this.state.showStudent}
          ></Navigate>
          {this.state.showStudent && (
            <>
              <Image image={student.studentImage}></Image>
              <Personal student={student}></Personal>
              {children}
              <College college={college}></College>
            </>
          )}
        </div>
      </section>
    );
  }
}

const Navigate = (props) => {
  return (
    <section>
      <button
        type="button"
        className="navigators"
        onClick={() => props.handleDelete(props.student.ID)}
      >
        <i className="fas fa-window-close"></i>
      </button>
      <button
        type="button"
        className="navigators"
        onClick={() => props.minimize()}
      >
        {props.showStudent ? (
          <i className="fas fa-window-minimize"></i>
        ) : (
          <i className="fas fa-window-maximize"></i>
        )}
      </button>
    </section>
  );
};

const Image = (props) => {
  return (
    <article>
      <img
        className="rounded-circle"
        width="140"
        src={props.image}
        alt="student"
      />
    </article>
  );
};

const Personal = (props) => {
  const { ID, firstName, lastName, DOB } = props.student;
  return (
    <article className="mt-3">
      <p>{ID}</p>
      <p>
        {firstName} {lastName}
      </p>
      <p>DOB: {DOB}</p>
    </article>
  );
};

const College = (props) => {
  const { collegeLogo, collegeName, collegeAddress } = props.college;
  return (
    <article>
      <img className="mb-3" width="70" src={collegeLogo} alt="logo" />
      <p className="text-uppercase">{collegeName}</p>
      <p>{collegeAddress}</p>
    </article>
  );
};
