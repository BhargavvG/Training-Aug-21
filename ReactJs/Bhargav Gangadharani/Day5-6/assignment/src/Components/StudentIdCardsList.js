import React, { Component } from "react";
import StudentIDCard from "./StudentIdCard";
import students from "./StudentsData";
import college from "./CollegeData";
import "./StudentIdCard.css";

export default class StudentIdCardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: students,
      college: college,
    };
  }

  handleDelete = (id) => {
    const remainingStudents = this.state.students.filter(
      (item) => item.ID !== id
    );
    this.setState({ students: remainingStudents });
  };

  render() {
    return (
      <div>
        <div className="row">
          {this.state.students.map((s, i) => (
            <StudentIDCard
              key={s.ID}
              student={s}
              college={this.state.college}
              handleDelete={this.handleDelete}
            ></StudentIDCard>
          ))}
        </div>
      </div>
    );
  }
}
