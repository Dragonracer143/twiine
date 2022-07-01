import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ReactDOM from 'react-dom';  
import ListingForm from "./components/ListingForm";
import Process from "./pages/process";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import EditComponent from "./components/EditComponent";
import Placemanage from "./components/Placemanage";
import Maindashboard from "./components/Maindashboard";
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Process/>} />
          <Route path="/form-listing" element={<ListingForm/>} />
          <Route path="/place-management" element={<Placemanage/>} />
          <Route path="/dashboard/edit/:id" element={<EditComponent/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard" element={<Maindashboard/>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
