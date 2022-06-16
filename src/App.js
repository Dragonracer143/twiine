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
import Testing from './components/Testing'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Process/>} />
          <Route path="/form-listing" element={<ListingForm/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route path="/testing" element={<Testing/>} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
