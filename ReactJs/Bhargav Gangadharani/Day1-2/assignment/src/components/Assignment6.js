import React from "react";

// While calling StudentID Component in the app Component pass one <p>Student Details</p> as children. Access it in the StudentID Card Component with Children props.

const student1 = {
  studentImage:
    "https://image.shutterstock.com/image-photo/portrait-smiling-young-college-student-260nw-1192615495.jpg",
  ID: "170890107020",
  firstName: "Ashish",
  lastName: "Mehta",
  DOB: "02/12/1999",
};

const college = {
  collegeLogo:
    "https://cracku.in/latest-govt-jobs/wp-content/uploads/2021/06/GTU-Logo.png",
  collegeName: "SLTIET- GTU",
  collegeAddress: "Rajkot, 360001",
};

function Assignment6() {
  return (
    <div className="container bg-light border border-primary rounded mt-5 p-5 text-center">
      <h1>Assignment 6</h1>
      <p className="lead">
        {`While calling StudentID Component in the app Component pass one
        <p>Student Details</p> as children. Access it in the StudentID Card
        Component with Children props.`}
      </p>
      <StudentIDCard student={student1} college={college}>
        <p>Student Details</p>
      </StudentIDCard>
    </div>
  );
}

function StudentIDCard(props) {
  const { student, college, children } = props;
  return (
    <section className="idcard">
      <Image image={student.studentImage}></Image>
      <Personal student={student}></Personal>
      {children}
      <College college={college}></College>
    </section>
  );
}

const Image = (props) => {
  return (
    <article className="studentImage">
      <img width="140" src={props.image} alt="student" />
    </article>
  );
};

const Personal = (props) => {
  const { ID, firstName, lastName, DOB } = props.student;
  return (
    <article>
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
    <article className="college">
      <img width="70" src={collegeLogo} alt="logo" />
      <p className="collegename">{collegeName}</p>
      <p>{collegeAddress}</p>
    </article>
  );
};

export default Assignment6;
