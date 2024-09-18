import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import Header from "./Header";
import Footer from "./Footer"
const App = () => {
  return (
    
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<AddEmployee />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
