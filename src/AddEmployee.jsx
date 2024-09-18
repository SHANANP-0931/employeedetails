import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './addemployee.css'; 

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    username: "",
    email: "",
    status: "Active"
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/employees/${id}`)
        .then((response) => setEmployee(response.data))
        .catch((error) => console.error("There was an error!", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:3001/employees/${id}`, employee)
        .then(() => navigate("/"));
    } else {
      axios.post("http://localhost:3001/employees", employee)
        .then(() => navigate("/"));
    }
  };

  return (
    <div className="card-container">
      <div  className="card">
        <div className="left-section">
          <img style={{marginTop:'80px'}} src="https://cdni.iconscout.com/illustration/premium/thumb/task-registration-2081679-1756042.png" alt="Employee" />
        </div>
        <div className="right-section">
          <h2>{id ? "Edit" : "Add"} Employee</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={employee.username}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={employee.status}
                onChange={handleChange}
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            <button type="submit">{id ? "Update" : "Add"} Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
