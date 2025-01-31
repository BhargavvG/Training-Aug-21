import React, { useState, useEffect } from "react";
import "./App.css";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import StudentData from "./serverRequests";
import axios from "axios";
const studReq = new StudentData();

const client = axios.create({
  baseURL: "http://localhost:5000/student",
});

export default function App() {
  const [refreshing, refresh ] = useState(false);

  useEffect(() => {
    client.get("/").then((response) => {
      console.log(response.data);
      setStudents(response.data);
    });
  }, [refreshing]);


  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    image: "",
    collegeName: "",
    collegeAddress: "",
    collegeCountry: "select",
    collegeLogo: "",
  });

  const [students, setStudents] = useState([]);
  const [isValidDetails, setDetails] = useState(false);
  const [isEditted, setisEditted] = useState(false);

  useEffect(() => {
    if (
      !student.id ||
      !student.firstName ||
      !student.lastName ||
      !student.dob ||
      !student.gender ||
      !student.collegeName ||
      !student.collegeAddress ||
      student.collegeCountry === "select" ||
      !student.image ||
      !student.collegeLogo
    ) {
      setDetails(false);
    } else {
      setDetails(true);
    }
  }, [student]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isEditted) {
      studReq.updateStudent(student.id, student);
    } else {
      studReq.addStudent(student);
    }
  
    setStudent({
      id: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      image: "",
      collegeName: "",
      collegeAddress: "",
      collegeCountry: "",
      collegeLogo: "",
    });
    setDetails(false);
    setisEditted(false);
    refresh(!refreshing);
  };

  const handleChange = (event) => {
    let targetName = event.target.name;
    let targetValue = event.target.value;

    if (targetName === "image" || targetName === "collegeLogo") {
      targetValue = `images/${event.target.files[0].name}`;
    }

    setStudent({
      ...student,
      [targetName]: targetValue,
    });
  };
  const deleteStudent = (id) => {
    studReq.deleteStudent(id);
    refresh(!refreshing);
  };

  const editStudent = (id) => {
    const selectedStudent = students.find((s) => s.id === id);
    setStudent(selectedStudent);
    setisEditted(true);
  };

  return (
    <div>
      <StudentForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValidDetails={isValidDetails}
        student={student}
        isEditted={isEditted}
      ></StudentForm>
      <StudentList
        students={students}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
      ></StudentList>
    </div>
  );
}
