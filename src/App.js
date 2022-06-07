import { useState } from 'react';
import './App.css';
import Home from "./components/Home"
import Result from './components/Result';
import ScreenFive from './components/ScreenFive';
import ScreenFour from './components/ScreenFour';
import ScreenFourTwo from './components/ScreenFourTwo';
import ScreenOne from './components/ScreenOne';
import ScreenSeven from './components/ScreenSeven';
import ScreenSix from './components/ScreenSix';
import ScreenThree from './components/ScreenThree';
import ScreenTwo from './components/ScreenTwo';

function App() {
  const [process , setProcess] = useState(0)
  return (
    <>
    {process == 0 && <Home  process={process} setProcess={setProcess} />} 
    {process == 1 && <ScreenOne  process={process} setProcess={setProcess} />} 
    {process == 2 && <ScreenTwo  process={process} setProcess={setProcess} />}
    {process == 3 && <ScreenThree  process={process} setProcess={setProcess} />}  
    {process == 4 && <ScreenFour  process={process} setProcess={setProcess} />}  
    {process == 5 && <ScreenFourTwo  process={process} setProcess={setProcess} />}  
    {process == 6 && <ScreenFive  process={process} setProcess={setProcess} />} 
    {process == 7 && <ScreenSix  process={process} setProcess={setProcess} />} 
    {process == 8 && <ScreenSeven  process={process} setProcess={setProcess} />} 
    {process == 9 && <Result  process={process} setProcess={setProcess} />} 
    
    </>
  );
}

export default App;
