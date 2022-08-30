import React, { useState } from "react";
import DashHeader from "../admin/DashHeader";
import Listtable from "../admin/Listtable";
import logo from "../../logo.png";
import restaurant from "../../restaurant.png";
import Placemanage from "../admin/Placemanage";
import { Link } from "react-router-dom";

function Dashboard() {
  const [open, setopen] = useState();
  const [addplace, setAddplace] = useState(false);
  function openSidebar() {
    setopen((prevState) => !prevState);
  }
  function addPlacehandler() {
    setAddplace((prevState) => !prevState);
  }
  React.useEffect(() => {});
  return (
    <>
      <div className="main-body">
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
              <Link
                to="/place-management"
                className="theme-color1"
                onClick={addPlacehandler}
              >
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Place Management</span>{" "}
              </Link>
            </div>
            <div className="menu-items">
              <Link
                to="/rating"
                className="theme-color1"
                onClick={addPlacehandler}
              >
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Rating</span>{" "}
              </Link>
            </div>
            <div className="menu-items">
              <Link
                to="/waiting-list"
                className="theme-color1"
                onClick={addPlacehandler}
              >
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Waiting List</span>{" "}
              </Link>
            </div>
          </div>
        </div>

        <div
          className={open ? "body-wrapper full" : "body-wrapper  "}
          id="body-content"
        >
          <DashHeader togglefn={openSidebar} />

          <div className="list-wrapper">
            {addplace ? <Placemanage /> : <Listtable />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
