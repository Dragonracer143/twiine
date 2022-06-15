// import React, {useState} from 'react'
// import Home from './Home';
// import ScreenOne from './ScreenOne';
// import ScreenTwo from './ScreenTwo';
// import ScreenThree from './ScreenThree';
// import ScreenFour from './ScreenFour';
// import ScreenFourTwo from './ScreenFourTwo';
// import ScreenSix from './ScreenSix';
// import ScreenFive from './ScreenFive';
// import ScreenSeven from './ScreenSeven';
// import Result from './Result';

// const MainScreen = () => {
//     const [process , setProcess] = useState(0);
//     const [city, setCity] = useState();
//     const [foods, setFoods] = useState();
//     const [activity, setActivity] = useState();

//     return (
//       <>

//       {process === 0 && <Home 
//        process={process} setProcess={setProcess} 
//       />} 

//       {process === 1 && <ScreenOne  
//        process={process} setProcess={setProcess}
//        city={city}
//        setCity={setCity}
//       />} 

//       {process === 2 && <ScreenTwo 
//        process={process} setProcess={setProcess}
//        city={city}
//        setCity={setCity}
//        />}

//       {process === 3 && <ScreenThree 
//        process={process} setProcess={setProcess} 
//       />}

//       {process === 4 && <ScreenFour 
//        process={process} setProcess={setProcess}
//        activity={activity} setActivity={setActivity}
//        />}

//       {process === 5 && <ScreenFourTwo 
//        process={process} setProcess={setProcess}
//        foods={foods} setFoods={setFoods}
//        />}

//       {process === 6 && <ScreenFive  process={process} setProcess={setProcess}
//        />}

//       {process === 7 && <ScreenSix  process={process} setProcess={setProcess} 
//       />}

//       {process === 8 && <ScreenSeven 
//        process={process} setProcess={setProcess}
//        city={city} setCity={setCity} 
//        foods={foods} setFoods={setFoods}
//        activity={activity} setActivity={setActivity}
//        />}

//       {process === 9 && <Result  process={process} setProcess={setProcess} />} 
      
//       </>
//     );
// }

// export default MainScreen