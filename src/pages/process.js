import React from "react";
import { useState } from "react";
import Home from "../components/Home";
import Result from "../components/Result";
import ScreenFive from "../components/ScreenFive";
import ScreenFour from "../components/ScreenFour";
import ScreenFourTwo from "../components/ScreenFourTwo";
import ScreenOne from "../components/ScreenOne";
import ScreenSeven from "../components/ScreenSeven";
import ScreenSix from "../components/ScreenSix";
import ScreenThree from "../components/ScreenThree";
import ScreenTwo from "../components/ScreenTwo";

const Process = () => {
  const [process, setProcess] = useState(0);
  const [collectedData, setCollectedData] = useState({})

  const [city, setCity] = useState();
  const [foods, setFoods] = useState();
  const [activity, setActivity] = useState();
  const [budget, setBudget] = useState();
  const [pref1, setPref1] = useState({});
  const [pref2, setPref2] = useState({});
  const [hungry, setHungry] = useState();

  return (
    <>
      {process === 0 && <Home process={process} setProcess={setProcess} />}
      {process === 1 && (
        <ScreenOne
          process={process}
          setProcess={setProcess}
          city={city}
          setCity={setCity}
        />
      )}
      {process === 2 && (
        <ScreenTwo
          process={process}
          setProcess={setProcess}
          city={city}
          setCity={setCity}
        />
      )}
      {process === 3 && ( <ScreenThree
       process={process} setProcess={setProcess}
       hungry={hungry} setHungry={setHungry}
        
        />
      )}
      {process === 4 && (
        <ScreenFour
          process={process}
          setProcess={setProcess}
          activity={activity}
          setActivity={setActivity}
        />
      )}
      {process === 5 && (
        <ScreenFourTwo
          process={process}
          setProcess={setProcess}
          foods={foods}
          setFoods={setFoods}
        />
      )}
      {process === 6 && (
        <ScreenFive
          process={process}
          setProcess={setProcess}
          budget={budget}
          setBudget={setBudget}
        />
      )}
      {process === 7 && (
        <ScreenSix
          process={process}
          setProcess={setProcess}
          pref1={pref1}
          setPref1={setPref1}
          pref2={pref2}
          setPref2={setPref2}
        />
      )}
      {process === 8 && (
        <ScreenSeven
          process={process}
          setProcess={setProcess}
          city={city}
          setCity={setCity}
          foods={foods}
          setFoods={setFoods}
          activity={activity}
          setActivity={setActivity}
          budget={budget}
          setBudget={setBudget}
          pref1={pref1}
          setPref1={setPref1}
          pref2={pref2}
          setPref2={setPref2}
          hungry={hungry} setHungry={setHungry}
          setCollectedData={setCollectedData}
        />
      )}
      {process === 9 && <Result process={process} collectedData={collectedData} setProcess={setProcess} />}
    </>
  );
};

export default Process;
