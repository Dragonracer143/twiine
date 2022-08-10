import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { spacing } from "@mui/system";
import Chart from "chart.js/auto";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
const ResultBreakdown = () => {
  const [playlist, setPlaylist] = useState();
  let token = localStorage.getItem("token")
  const [recent, setRecent] = useState([]);
  const [final, setFinal] = useState([]);
  // console.log("recent ",recent)

  let navigate = useNavigate()
  recent.forEach(function (x) {
    final[x] = (final[x] || 0 ) + 1;
  });
  
  // final[x] = (final[x] || 0 ) + 1;
  console.log("final val",final)

  let genereArray = Object.entries(final);
  // console.log("generarray",genereArray);

   let genername = []
   for (let i = 0; i < genereArray.length; i++) {
    const element = genereArray[i][0];
    genername.push(element)
   }
   
    let genervalue = []
    for (let i = 1; i < genereArray.length; i++) {
      const element = genereArray[i][1];
      genervalue.push(element)
     }
  const data = {
    
    labels: genername.slice(0,4),
    datasets: [
      {
        data: genervalue.slice(0,4),
        backgroundColor: [
          "rgb(201, 134, 73)",
          "rgb(70, 136, 236)",
          "rgb(255, 154, 98)",
          "rgb(217, 155, 255)",
          "rgb(228, 169, 81)",
        ],
        hoverOffset: 8,
        spacing: 18,
        borderRadius: 18,
        borderColor: "#000",
        borderWidth: 1,
        display:true
      },
    ],
  };
  const config = {
    type: "doughnut",
    data: data,
    
  };



   useEffect(()=>{
onGetdata();
   },[])
  const onGetdata = async (e) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setPlaylist(data.items);
  };
  useEffect(() => {
    getGenerslist();
  }, [final]);
  const getGenerslist = async (e) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?offset=0&limit=10",
      // "https://api.spotify.com/v1/me/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let vall = [];
    data.items.map((first) => {
      first.genres.forEach((valdata) => vall.push(valdata));
    });
    // console.log("vall", data  )
    setRecent(vall);
  };
  const goBack = () =>{
    let  path = "/musicyoulike"
    navigate(path)
  }
  


  return (
    <>
      <div className="ResultBreakdown">
        <img className="twiinevblack_logo" src="./img/twiineblack.png" />
        <div className="heading mb-4">We saw that you like:</div>

        <div className="row results">
          <div className="col-12 col-md-6">
            <div className="map">
              <div className="leftchart">
                <Doughnut data={data} 
                
                ></Doughnut>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="right_table">
              <p>Your current top 5:</p>
              {playlist?.map((ele,key)=>
              <div key={key} className="song_one mt-2">
              <img className="song_img" src={ele?.album?.images[1]?.url} />
              <div className="song_detail">
                <p>{ele?.name}</p>
                <p>{ele?.artists[0]?.name}</p>
              </div>
              <div className="song_no"><p>#{key + 1}</p></div>
            </div>
              )}
              
              {/* <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>Heartbreak Anniversary</p>
                  <p>Giveon</p>
                </div>


                <div className="song_no"><p>#2</p></div>
              </div>
              <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>Strange Fruit</p>
                  <p>Billie Holiday</p>
                </div>
                <div className="song_no"><p>#3</p></div>
              </div>
              <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>Clarity</p>
                  <p>Zedd</p>
                </div>
                <div className="song_no"><p>#4</p></div>
              </div>
              <div className="song_one mt-2">
                <img className="song_img" src="./img/song_one.png" />
                <div className="song_detail">
                  <p>The Message</p>
                  <p>Grandmaster Flash</p>
                </div>
                <div className="song_no"><p>#5</p></div>
              </div> */}
            </div>
          </div>
        </div>

        <button className="Go_Back btn" onClick={goBack} type="button">Go Back</button>

      </div>
    </>
  );
};

export default ResultBreakdown;
