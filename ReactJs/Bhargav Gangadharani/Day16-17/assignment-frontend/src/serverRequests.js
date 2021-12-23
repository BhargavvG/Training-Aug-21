import axios from "axios";
import React from "react";

const client = axios.create({
  baseURL: "http://localhost:5000/student",
});

class StudentData {
  getStudents() {
    client.get("/").then((response) => {
      // console.log(response.data);
      //   return response.data;
    });
  }

  addStudent(student) {
    client.post("/", { ...student }).then((response) => {
      console.log(response);
    });
  }

  updateStudent(id, student) {
    client.put(`/${id}`, { ...student }).then((response) => {
      console.log(response);
    });
  }

  deleteStudent(id) {
    client.delete(`/${id}`).then((response) => {
      console.log(response);
    });
  }
}

export default StudentData;
