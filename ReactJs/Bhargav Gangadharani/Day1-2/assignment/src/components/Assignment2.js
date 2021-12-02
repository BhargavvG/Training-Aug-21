import React from "react";

// Create a StudentIDCard Component which will include another component image,Personal Component include(ID,FirstName,LastName,DOB),College Component include collegeName,College Address and College Logo)

function Assignment2() {
  return (
    <div className="container bg-light border border-primary rounded mt-5 p-5 text-center">
      <h1>Assignment 2</h1>
      <p className="lead">
        Create a StudentIDCard Component which will include another component
        image,Personal Component include(ID,FirstName,LastName,DOB),College
        Component include collegeName,College Address and College Logo
      </p>
      <StudentIDCard></StudentIDCard>
    </div>
  );
}

function StudentIDCard() {
  return (
    <section className="idcard">
      <Image></Image>
      <Personal></Personal>
      <College></College>
    </section>
  );
}

const Image = () => {
  return (
    <article className="studentImage">
      <img
        width="140"
        src="https://image.shutterstock.com/image-photo/portrait-smiling-young-college-student-260nw-1192615495.jpg"
        alt="student"
      />
    </article>
  );
};

const Personal = () => {
  return (
    <article>
      <p>170890107013</p>
      <p>Bhargav Gangadharani</p>
      <p>DOB: 09/12/1999</p>
    </article>
  );
};

const College = () => {
  return (
    <article className="college">
      <img
        width="70"
        src="https://cracku.in/latest-govt-jobs/wp-content/uploads/2021/06/GTU-Logo.png"
        alt="GTU"
      />
      <p className="collegename">SLTIET</p>
      <p>Rajkot, 360001</p>
    </article>
  );
};

export default Assignment2;
