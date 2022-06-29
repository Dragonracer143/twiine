import React, { useState } from "react";
import DashHeader from "./DashHeader";
import Listtable from "./Listtable";
import logo from "../logo.png";
import restaurant from "../restaurant.png";
import Placemanage from "./Placemanage";

function Dashboard() {
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
  React.useEffect(()=>{
   
  })
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
              <a href="#" className="theme-color1">
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Listing</span>{" "}
              </a>
            </div>
            <div className="menu-items">
              <a href="#" className="theme-color1" onClick={addPlacehandler}>
                {" "}
                <img src={restaurant} className="site-logo" />
                &nbsp;<span>Place Management</span>{" "}
              </a>
            </div>
          </div>
        </div>

        <div
          className={open ? "body-wrapper full" : "body-wrapper"}
          id="body-content"
        >
          <DashHeader togglefn={openSidebar} />
          <div className="list-wrapper">
            {addplace ? <Placemanage/>  : <Listtable />}

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
