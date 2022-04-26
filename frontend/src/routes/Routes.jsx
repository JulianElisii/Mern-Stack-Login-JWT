import React from 'react';
import { Routes, Route } from "react-router-dom";
import TaskPage from "../pages/TaskPage"
import LoginForm from "../pages/LoginForm"
import RegisterForm from "../pages/RegisterForm"

const RoutesForm = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<TaskPage />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
      </Routes>

    </div>
  );
}

export default RoutesForm;




