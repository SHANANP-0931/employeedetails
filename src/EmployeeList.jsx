import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './employeelist.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/employees")
      .then(response => setEmployees(response.data))
      .catch(error => console.error("There was an error!", error));
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/employees/${id}`)
      .then(() => setEmployees(employees.filter(emp => emp.id !== id)));
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <Link to="/add" className="add-btn">Add Employee</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td className="username-col">{emp.username}</td>
              <td className="email-col">{emp.email}</td>
              <td className={`status-col ${emp.status === "Active" ? "active" : "inactive"}`}>{emp.status}</td>
              <td>
                <Link to={`/edit/${emp.id}`} className="edit-btn">Edit</Link>
                <button className="delete-btn" onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
