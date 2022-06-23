import React, { useState } from "react";
import DashHeader from "./DashHeader";
import Listtable from "./Listtable";
import logo from "../logo.png";
import restaurant from "../restaurant.png";
import ListingForm from './ListingForm';




function EditComponent() {
  
  const [open, setopen] = useState();
  const [token, setToken] = useState(0)
  function openSidebar() {
    setopen((prevState) => !prevState);
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
          </div>
        </div>

        <div
          className={open ? "body-wrapper full" : "body-wrapper"}
          id="body-content"
        >
          <DashHeader togglefn={openSidebar} />
          <div className="list-wrapper">
          <div className="listing-table">
        <div className="table-card">
          <div className="table-head pb-4 d-flex justify-content-end">
           
          </div>
          <ListingForm />
          
        </div>
      </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditComponent;
