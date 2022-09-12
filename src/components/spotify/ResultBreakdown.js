import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArcElement } from "chart.js";
import { Chart as ChartJS, Tooltip, Legend } from "chart.js";
import CircularIndeterminate from "./Loader";
import { AddBoxOutlined } from "@mui/icons-material";
import ResultBreakdownstory from "./Resultstory";

import { toPng } from "html-to-image";
import { useCallback } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
const ResultBreakdown = (props) => {
  const refs = document.getElementById("id");
  console.log("vrefsrefs: ", refs);
  const [playlist, setPlaylist] = useState();
  const [filterstory, setFilterstory] = useState([]);
  const [unfilterstory, setUnfilterstory] = useState([]);
  const [updata, setUpdata] = useState();
  const colorArray =[

    {
      "id":0,
      "name": "Pop",
      "color":"#375F68"

    },
    {
      "id":1,
      "name": "PoFolk/Acousticp",
      "color":"#AC6E5F"

    },
    {
      "id":2,
      "name": "Reggae",
      "color":"#4D745F"

    },
      {
        "id":3,
        "name": "Rock",
        "color":"#322421"
  
      },
      {
        "id":4,
        "name": "Classical",
        "color":"#C0C9C8"
  
      },
      {
        "id":5,
        "name": "Rap",
        "color":"#234465"
  
      },
      {
        "id":6,
        "name": "Hip Hop",
        "color":"#98BDC5"
  
      },
      {
        "id":7,
        "name": "Metal",
        "color":"#F05745"
  
      },
      {
        "id":8,
        "name": "pakistani hip hop",
        "color":"#D0F0C0"
  
      },
      {
        "id":9,
        "name": "sufi",
        "color":"#ACA173"
  
      },
      {
        "id":10,
        "name": "desi hip hop",
        "color":"#978287"
  
      },
      {
        "id":11,
        "name": "desi pop",
        "color":"#DAA762"
  
      },
      {
        "id":12,
        "name": "punjabi pop",
        "color":"#030200"
  
      },
      {
        "id":13,
        "name": "Easy Listening / Soft Ro",
        "color":"#8A5334"
  
      }, {
        "id":14,
        "name": "K-Pop",
        "color":"#DEB0BA"
  
      }, {
        "id":15,
        "name": "R & B",
        "color":"#947700"
  
      }
      , {
        "id":16,
        "name": "Alternative",
        "color":"#8A8D6E"
  
      }
      , {
        "id":17,
        "name": "Country",
        "color":"#D4BCB0"
  
      }
      , {
        "id":18,
        "name": "Soul",
        "color":"#B27229"
  
      }


    ]
    let generss=props?.genernames.slice(0, 5)
    console.log("color", generss);

    let colorss=[];
    for(let i=0; i<generss.length; i++){
      for(let j=0; j<colorArray.length; j++){
        // console.log("colors are matched", colorArray[j].color);
        
        if(colorArray[j].name===generss[i]){
          colorss.push(colorArray[j].color);  
          
          console.log("colors are matched", colorArray[j].color);
        }
      }
    }
    
   const data = {
    labels: props?.genernames.slice(0, 5),
    type: "pie",
    indexLabel: props?.genernames.slice(0, 5),
    indexLabelPlacement: "inside",
    indexLabelFontSize: 15,
    indexLabelMaxWidth: 53,
    datasets: [
      {
        data: props?.genervalues.slice(0, 5),
        backgroundColor: colorss,
        borderColor: "#000",
        display: true,
      },
    ],
  };




  const [instagram, setInstagram] = useState(false);
  let token = localStorage.getItem("token");
  console.log("filterstory", filterstory);

  useEffect(() => {
    setTimeout(() => {
      const localData = JSON.parse(localStorage.getItem("filterResturant"));
      setFilterstory(localData);
    }, 3000);
  console.log("localdata", filterstory.MusicVibe1)
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const localDatafiler = JSON.parse(localStorage.getItem("Withoutfilter"));
      setUnfilterstory(localDatafiler);
    }, 3000);
 
  }, []);
  let navigate = useNavigate();
  useEffect(() => {
    const localDatafilter = localStorage.getItem("unfilterstate");
    const Datafilter = JSON.parse(localStorage.getItem("filterstate"));
    if (localDatafilter) {
      setUpdata(localDatafilter);
    } else {
      setUpdata(Datafilter);
    }
  });

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    getGenerslist();
  }, []);
  const getGenerslist = async (e) => {
    const { data } = await axios
      .get("https://api.spotify.com/v1/me/top/artists?offset=0&limit=10", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
      });
    let vall = [];
    data.items.map((first) => {
      first.genres.forEach((valdata) => {
        vall.push(valdata);
      });
    });

    let newarray = [];
    vall.forEach(function (x) {
      newarray[x] = (newarray[x] || 0) + 1;
    });
    let genereArray = Object.entries(newarray);
    function compareSecondColumn(a, b) {
      if (a[1] === b[1]) {
        return 0;
      } else {
        return b[1] < a[1] ? -1 : 1;
      }
    }
    genereArray.sort(compareSecondColumn);
    let genername = [];

    for (let i = 0; i < genereArray.length; i++) {
      const element = genereArray[i][0];
      genername.push(element);
    }
    let genervalue = [];
    for (let i = 1; i < genereArray.length; i++) {
      const element = genereArray[i][1];
      genervalue.push(element);
    }
    props?.setGenernames(genername);
    props?.setGenervalues(genervalue);
  };

  useEffect(() => {
    onGetdata();
  }, []);

  const onGetdata = async (e) => {
    const { data } = await axios
      .get("https://api.spotify.com/v1/me/top/tracks?offset=0&limit=5", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err?.response?.status == 401) {
          localStorage.clear();
          navigate("/");
        }
      });
    setPlaylist(data.items);
  };

  const goBack = () => {
    let path = "/musicyoulike";
    navigate(path);
  };

  const shareOnsocial = () => {
    setInstagram(true);
  };

  useEffect(() => {
    if (instagram == true) {
      setTimeout(() => {
        onButtonClick();
      }, 1000);
    }
  });

  const onButtonClick = useCallback(() => {
    if (refs === null) {
      return;
    }

    toPng(refs)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "name.png";
        link.href = dataUrl;
        link.click();
        setTimeout(() => {
          setInstagram(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refs]);

  return (
    <>
      <div className={instagram == true ? "download-image" : ""}>
        <div className="ResultBreakdown">
          <img className="twiinevblack_logo" src="./img/twiineblack.png" />
          <div className="heading mb-4">
            *drum roll* Here's your{" "}
            <span className="img-result-down">
              genre breakdown:{" "}
              <img className="img-result" src="./img/Vector.png"></img>
            </span>
          </div>
          {playlist?.length !== 0 ? (
            <div className="row results">
              <div className="col-12 col-md-6">
                <div className="right_table">
                  <p>Your top 5 songs right now</p>
                  {playlist?.map((ele, key) => (
                    <div key={key} className="song_one mt-2">
                      <div className="song_no">
                        <p>{key + 1}.</p>
                      </div>
                      <div className="song_detail">
                        <p className="song-name">{ele?.name}</p>
                        <p className="artist">{ele?.artists[0]?.name}</p>
                      </div>
                      <img
                        className="song_img"
                        src={ele?.album?.images[1]?.url}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="map">
                  <div className="leftchart">
                    <Pie data={data} options={options}></Pie>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <CircularIndeterminate />
          )}

          <div className="go-back-share">
            <button className="Go_Back btn" onClick={goBack} type="button">
              <img className="back" src="./img/back-arrow.png" />
              Go Back
            </button>
            <button
              className="Go_Back btn"
              onClick={shareOnsocial}
              type="button"
            >
              <img className="genere-image" src="./img/share.png" />
              Share on social media{" "}
            </button>
          </div>
          <br />
          <br />
          <br />
        </div>
        {instagram == true ? <p className="download"> ...downloading</p> : null}

        {instagram == true ? (
          <ResultBreakdownstory
            filterstory={filterstory}
            unfilterstory={unfilterstory}
            instagram={instagram}
            updata={updata}
          />
        ) : null}
      </div>
    </>
  );
};

export default ResultBreakdown;
