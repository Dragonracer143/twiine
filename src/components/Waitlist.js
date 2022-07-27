import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Addwaitlist } from "../Shared/Services";
import { useNavigate } from "react-router-dom";

const Waitlist = (props) => {
  const [waitlistobject, setWaitlistObject] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  let navigate = useNavigate();

  const Waitlistmange = (e) => {
    e.preventDefault();
    Addwaitlist(waitlistobject)
      .then(function (response) {
        alert("join waitlist");

        setWaitlistObject((waitlistobject) => {
          return {
            ...waitlistobject,
            firstname: "",
            lastname: "",
            email: "",
          };
        });
        // navigate('/')
      })
      .catch(function (error) {
        if (error.response.status == 500) {
          console.log(error);
        } else {
          alert(error.response.data.message);
        }
      });
  };



  return (
    <div className="Background_color">
      <div className="inner">
        <div className="content">
          <h1>
            Welcome to <img src="./img/twiine2.png" />
          </h1>
          <p>We're excited that you're excited! let's keep in touch</p>
        </div>
        <div className="lets_do_it">
          <form
            className="form-data"
            onSubmit={(e) => {
              Waitlistmange(e);
            }}
          >
            <input
              type="text"
              name="firstname"
              value={waitlistobject.firstname}
              className=" waitlist-form"
              placeholder="First Name"
              onChange={(e) => {
                setWaitlistObject((old) => {
                  old["firstname"] = e.target.value;
                  return { ...old };
                });
              }}
              required
            ></input>
            <input
              type="text"
              name="lastname"
              value={waitlistobject.lastname}
              className=" waitlist-form"
              placeholder="Last Name"
              onChange={(e) => {
                setWaitlistObject((old) => {
                  old["lastname"] = e.target.value;
                  return { ...old };
                });
              }}
              required
            ></input>
            <input
              type="email"
              name="email"
              value={waitlistobject.email}
              className=" waitlist-form"
              placeholder="Email Address"
              onChange={(e) => {
                setWaitlistObject((old) => {
                  old["email"] = e.target.value;
                  return { ...old };
                });
              }}
              required
            ></input>
            <div className="button_join">
              <button type="submit">Join the Waitlist</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;
