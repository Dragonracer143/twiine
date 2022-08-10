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
import Ratingmanage from "./components/Ratingmange";
import Waitlist from "./components/Waitlist";
import Waitinglisttable from "./components/Waitinglisttable";
import Musiclogin from "./components/spotify/MusicLogin";
import Userlocation from "./components/spotify/Userlocation";
import Musicyoulike from "./components/spotify/Musicyoulike";
import ResultBreakdown from "./components/spotify/ResultBreakdown";
import Instagramstory from "./components/spotify/Instagramstory";
import Login from "./components/Login";
function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Process/>} />
          <Route path="/form-listing" element={<ListingForm/>} />
          <Route path="/place-management" element={<Placemanage/>} />
          <Route path="/rating" element={<Ratingmanage/>} />
          <Route path="/dashboard/edit/:id" element={<EditComponent/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/waitlist" element={<Waitlist/>} />
          <Route path="/waiting-list" element={<Waitinglisttable/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard" element={<Maindashboard/>} />
          <Route path="/logindashboard" element={<Login/>} />


          <Route path="/Musiclogin" element={<Musiclogin/>} />
          <Route path="/userlocation" element={<Userlocation/>} />
          <Route path="/musicyoulike" element={<Musicyoulike/>} />
          <Route path="/Resultbreakdown" element={<ResultBreakdown/>} />
          <Route path="/instagramstory" element={<Instagramstory/>} />






        </Routes>
      </Router>
    </>
  );
}

export default App;
