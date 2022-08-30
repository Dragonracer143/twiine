import React from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "../../Services/Services";

export default function AdminLogin() {
  let navigate = useNavigate();
  const [loginObject, setLoginObject] = React.useState({
    username: "",
    password: "",
  });
  const adminLogin = (e) => {
    e.preventDefault();
    adminLoginApi(loginObject)
      .then(function (response) {
        localStorage.setItem("access_token", response.data.result);
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);

        if (error.response.status == 500) {
          console.log(error);
        } else {
          alert(error.response.data.message);
        }
      });
  };
  return (
    <div className="adminLoginDiv">
      <center>
        <h3>Admin Login</h3>
        <form
          onSubmit={(e) => {
            adminLogin(e);
          }}
        >
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Username"
              name="Username"
              value={loginObject.username}
              onChange={(e) => {
                setLoginObject((old) => {
                  old["username"] = e.target.value;
                  return { ...old };
                });
              }}
            />
            <input
              type="password"
              className="form-control"
              id="text"
              placeholder="Password"
              name="Password"
              value={loginObject.password}
              onChange={(e) => {
                setLoginObject((old) => {
                  old["password"] = e.target.value;
                  return { ...old };
                });
              }}
            />
          </div>
          <input type="submit" value="Login" />
        </form>
      </center>
    </div>
  );
}
