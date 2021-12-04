import React, { Component } from "react";
import StudentIDCard from "./StudentIdCard";
import students from "./StudentsData";
import college from "./CollegeData";

export default class StudentIdCardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: students,
      college: college,
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.state.students.map((s, i) => (
            <StudentIDCard
              key={s.ID}
              student={s}
              college={this.state.college}
            ></StudentIDCard>
          ))}
        </div>
      </div>
    );
  }
}
