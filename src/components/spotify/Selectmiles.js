import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
const Selectmiles = () => {
  const [val, setVal] = useState();
  const [err, setErr] = useState();
  let navigate = useNavigate();
  const getMilesvalue = () => { 
    if (val === 1) {
      setErr(true);
    } else {
      let path = "/musicyoulike";
      navigate(path);
    }
  };
/* get selected miles*/
  function valuetext(value) {
    setVal(value);
    localStorage.setItem("selectedMile", value);
  }
  const marks = [
    {
      value: 1,
      label: "1 Mile",
    },
    {
      value: 50,
      label: "50 Miles",
    },
  ];

  return (
    <>
      <div className="Selectmiles_main">
        <div className="Selectmiles_main_inner">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />
          <div className="heading">
            How far are you willing to{" "}
            <span className="location">
              travel
              <img className="Location_Vector_logo" src="./img/Vector.png" />
            </span>{" "}
            ?
          </div>
          <Box sx={{ width: "60%", marginTop: "40px" }}>
            <Slider
              aria-label="Always visible"
              defaultValue={1}
              getAriaValueText={valuetext}
              step={5}
              marks={marks}
              valueLabelDisplay="on"
              min={1}
              max={50}
            />
          </Box>
          <div className="results_btn">
            <button className="btn" type="button" onClick={getMilesvalue}>
              Show me my results!
            </button>
          </div>
          {err === true ? <p className="err">Please Select Miles</p> : ""}
        </div>
      </div>
    </>
  );
};

export default Selectmiles;
