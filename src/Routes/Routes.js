import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import ListingForm from "../components/admin/ListingForm";
import AdminLogin from "../components/admin/AdminLogin";
import EditComponent from "../components/admin/EditComponent";
import Placemanage from "../components/admin/Placemanage";
import Maindashboard from "../components/admin/Maindashboard";
import Ratingmanage from "../components/admin/Ratingmange";
import Waitlist from "../components/admin/Waitlist";
import Waitinglisttable from "../components/admin/Waitinglisttable";
import Musiclogin from "../components/Login/MusicLogin";
import Userlocation from "../components/spotify/Userlocation";
import Musicyoulike from "../components/spotify/Musicyoulike";
import ResultBreakdown from "../components/spotify/ResultBreakdown";
import Instagramstory from "../components/spotify/Instagramstory";
import Selectmiles from "../components/spotify/Selectmiles";
import Userlocations from "../components/applemusic/Applenusiclocation";
import Applemuicyoulike from "../components/applemusic/Applemusicyoulike";
import Appleselectmile from "../components/applemusic/Appleselectmile";
import Appleinsta from "../components/applemusic/Appleinsta";
import AppleResultBreak from "../components/applemusic/Appleresultbreak";
import ResultBreakdownstory from "../components/spotify/Resultstory";
import Notfound from "../Notfound/Notfound";
import PrivateRoute from "./Privateroutes";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SPOTIFY_REFRESH_TOKEN,
  REDIRECT_URI,
  CLIENT_ID,
  SECRET_ID,
} from "../Services/Config";
import axios from "axios";

const LoginCallback = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  var code = location.search.split("=")[1];

  useEffect(() => {
    if (code) {
      getAuthDetail(code);
    }
  }, []);

  const getAuthDetail = async (code) => {
    const response = await axios({
      method: "post",
      url: SPOTIFY_REFRESH_TOKEN,
      data: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
      }).toString(),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${SECRET_ID}`)}`,
      },
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      return navigate("/");
    }
  };

  return <></>;
};

const Routesdata = () => {
  const [rest, setRest] = useState([]);
  const [genernames, setGenernames] = useState([]);
  const [genervalues, setGenervalues] = useState([]);
  const [randomdata, setRandomdata] = useState("");
  const [propsData, setPropsData] = useState([]);
  return (
    <Router>
      <Routes>
        {/* admin routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<Maindashboard />} />
        <Route path="/form-listing" element={<ListingForm />} />
        <Route path="/place-management" element={<Placemanage />} />
        <Route path="/rating" element={<Ratingmanage />} />
        <Route path="/dashboard/edit/:id" element={<EditComponent />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/waiting-list" element={<Waitinglisttable />} />
        <Route path="/login-callback" element={<LoginCallback />} />
        {/* end admin routes */}

        <Route path="/" element={<Musiclogin />} />
<Route path="/" element={<PrivateRoute/>}>

        <Route
          path="/userlocation"
          element={<Userlocation setRandomdata={setRandomdata} />}
        />
        <Route
          path="/musicyoulike"
          element={
            <Musicyoulike
              rest={rest}
              setRest={setRest}
              randomdata={randomdata}
              propsData={propsData}
              setPropsData={setPropsData}
            />
          }
        />
        <Route
          path="/Resultbreakdown"
          element={
            <ResultBreakdown
              propsData={propsData}
              genernames={genernames}
              genervalues={genervalues}
              setGenernames={setGenernames}
              setGenervalues={setGenervalues}
            />
          }
        />
        <Route
          path="/ResultBreakdownstory"
          element={<ResultBreakdownstory propsData={propsData} />}
        />
        <Route
          path="/instagramstory"
          element={
            <Instagramstory
              genernames={genernames}
              genervalues={genervalues}
              rest={rest}
              setRest={setRest}
              randomdata={randomdata}
            />
          }
        />

        <Route
          path="/selectmiles"
          element={<Selectmiles setRandomdata={setRandomdata} />}
        />
        </Route>
        <Route
          path="/userlocations"
          element={<Userlocations setRandomdata={setRandomdata} />}
        />
        <Route
          path="/selectedmile"
          element={<Appleselectmile setRandomdata={setRandomdata} />}
        />
        <Route
          path="/likemusic"
          element={
            <Applemuicyoulike
              rest={rest}
              setRest={setRest}
              randomdata={randomdata}
            />
          }
        />
        <Route
          path="/Appleresult"
          element={
            <AppleResultBreak
              genernames={genernames}
              genervalues={genervalues}
              setGenernames={setGenernames}
              setGenervalues={setGenervalues}
            />
          }
        />
        {/* Not found */}
         <Route path="*" element={<Notfound/>}/>
        {/* <Route path="/appleinstastory" element={<Appleinsta />} /> */}
      </Routes>
    </Router>
  );
};

export default Routesdata;
