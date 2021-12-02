import React from "react";

// Create Students Array of 3 students with field Image,Id,FirstName,LastName,DOB,CollegeName,Address and CollegeLogo and pass it as Object to the StudentIDCardComponent

const students = [
  {
    studentImage:
      "https://image.shutterstock.com/image-photo/portrait-smiling-young-college-student-260nw-1192615495.jpg",
    ID: "170890107030",
    firstName: "Rushil",
    lastName: "Shakti",
    DOB: "02/12/1999",
  },
  {
    studentImage:
      "https://image.shutterstock.com/image-photo/portrait-smiling-young-college-student-260nw-1192615495.jpg",
    ID: "170890107040",
    firstName: "Shyam",
    lastName: "Parmar",
    DOB: "03/12/1999",
  },
  {
    studentImage:
      "https://image.shutterstock.com/image-photo/portrait-smiling-young-college-student-260nw-1192615495.jpg",
    ID: "170890107050",
    firstName: "Harshil",
    lastName: "Sarvaiya",
    DOB: "04/12/1999",
  },
];

const college = {
  collegeLogo:
    "https://cracku.in/latest-govt-jobs/wp-content/uploads/2021/06/GTU-Logo.png",
  collegeName: "SLTIET- GTU",
  collegeAddress: "Rajkot, 360001",
};

function Assignment5() {
  const studentsElement = [];

  students.forEach((s) => {
    studentsElement.push(
      <StudentIDCard key={s.ID} student={s} college={college}></StudentIDCard>
    );
  });

  return (
    <div className="container bg-light border border-primary rounded mt-5 p-5 text-center">
      <h1>Assignment 5</h1>
      <p className="lead">
        Create Students Array of 3 students with field
        Image,Id,FirstName,LastName,DOB,CollegeName,Address and CollegeLogo and
        pass it as Object to the StudentIDCardComponent
      </p>
      <section className="row">{studentsElement}</section>
    </div>
  );
}

function StudentIDCard(props) {
  const { student, college } = props;
  return (
    <section className="idcard col-3">
      <Image image={student.studentImage}></Image>
      <Personal student={student}></Personal>
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

export default Assignment5;
