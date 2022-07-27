import React, { useState } from "react";
import DashHeader from "./DashHeader";
import Listtable from "./Listtable";
import logo from "../logo.png";
import restaurant from "../restaurant.png";
import Placemanage from "./Placemanage";
import ListingForm from "./ListingForm";

import { Link } from "react-router-dom";
const Maindashboard = (props) => {
    const [open, setopen] = useState();
    const [token, setToken] = useState(0)
    const [addplace, setAddplace] = useState(false);
    function openSidebar() {
      setopen((prevState) => !prevState);
    }
    function addPlacehandler() {
      setAddplace((prevState) => !prevState);
      // setAddplace(true);
  
    }
   
  return (
    <>
    {/* <DashHeader/> */}
<div className="main-dashboard-body">
    <nav className="bg-red">
            <div className="container small-container">
              <div className="d-flex justify-content-between py-3 align-items-center">
                <div className="title-bar">
                <a className="d-inline-block text-white" href="#" onClick={openSidebar}>
                     <i className="fa fa-bars" aria-hidden="true"></i>
                </a>
                  {/* <a className="mobile-menu-icon " href="#">
                    <img
                      src="images/toggle.png"
                      className="img-fluid"
                      width="20px"
                    />
                  </a> */}
                </div>
                <div id="navbar-custom" className="navbar-custom">
                  <ul className="d-flex justify-content-center align-items-center mb-0 ">
                    <li className="nav-item pl-lg-4 pr-2">
                      <a className="account-name d-inline-block" href="#">
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
    <div className="main-body target">
        {/* Desktop Screen  */}
        <div
          id="sidebar-menu"
          className={open == true ? "sidebar-menu open" : "sidebar-menu"}
        >
          <div className="brand-name">
            <a href="#">
              <img src={logo} className="site-logo" />
            </a>
          </div>
          <div className="sidebar-menu-inner">
            <div className="menu-items">
              <Link to="/dashboard" href="#" className="theme-color1">
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Listing</span>{" "}
              </Link>
            </div>
            <div className="menu-items">
              <Link to="/place-management" className="theme-color1" onClick={addPlacehandler}>
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Place Management</span>{" "}
              </Link>
            </div>
            <div className="menu-items">
              <Link to="/rating" className="theme-color1" onClick={addPlacehandler}>
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Rating</span>{" "}
              </Link>
            </div>
            <div className="menu-items">
              <Link to="/waiting-list" className="theme-color1" onClick={addPlacehandler}>
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Waiting List</span>{" "}
              </Link>
            </div>
          </div>
        </div>
        
        </div>
        </div>
    </>
  )
}

export default Maindashboard