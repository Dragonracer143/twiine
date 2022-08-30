import React, { useEffect, useState } from "react";
import ListingForm from "../admin/Maindashboard";
import loader from "../../img/loader.webp";
import Maindashboard from "../admin/Maindashboard";
import axios from "axios";
import { baseUrl } from "../../Services/Config";
const Waitinglisttable = () => {
  const [formSwitch, setformSwitch] = useState(true);
  const [loaderState, setLoaderState] = useState(true);
  const [waitlistdata, setWaitlistdata] = useState();


  useEffect(() => {
    getData();
  }, [waitlistdata]);

  const getData = () => {
    axios.get(baseUrl + "getwaitlist").then((response) => {
      setWaitlistdata(response.data);
      setLoaderState(false);
    });
  };

  return (
    <>
      <Maindashboard />

      <div className="listing-table  list-wrappers">
        <div className="table-card">
          {formSwitch ? "" : <ListingForm />}
          <div
            className={
              formSwitch ? "table-wrapper-sec " : "table-wrapper-sec hide"
            }
          >
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <b>First Name</b>
                    </td>
                    <td>
                      <b>Last Name</b>
                    </td>
                    <td>
                      <b>Email Address</b>
                    </td>
                  </tr>
                  {waitlistdata?.length > 0 ? (
                    waitlistdata?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item?.firstname ? item.firstname : "N/A"}</td>
                          <td>{item?.lastname ? item.lastname : "N/A"}</td>
                          <td>{item?.email ? item.email : "N/A"}</td>

                          <td></td>
                        </tr>
                      );
                    })
                  ) : (
                    <span className="loaderClass">
                      {loaderState ? (
                        <>
                          <img src={loader} />
                        </>
                      ) : (
                        <>No Data</>
                      )}
                    </span>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Waitinglisttable;
