import React, { useState } from "react";
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

const Routesdata = () => {
  const [rest, setRest] = useState([]);
  const [genernames, setGenernames] = useState([]);
  const [genervalues, setGenervalues] = useState([]);
  const [randomdata, setRandomdata] = useState("");

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
        {/* end admin routes */}

        <Route path="/" element={<Musiclogin />} />
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
            />
          }
        />
        <Route
          path="/Resultbreakdown"
          element={
            <ResultBreakdown
              genernames={genernames}
              genervalues={genervalues}
              setGenernames={setGenernames}
              setGenervalues={setGenervalues}
            />
          }
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
        {/* <Route path="/appleinstastory" element={<Appleinsta />} /> */}
      </Routes>
    </Router>
  );
};

export default Routesdata;
