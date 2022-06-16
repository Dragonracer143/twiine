import React, { useState } from 'react';
import ListingForm from './ListingForm';
import { confirm } from "react-confirm-box";
import { getAllDetailsApi } from '../Shared/Services';

const Listtable = () => {
  const [formSwitch, setformSwitch] = useState(true);
  const [dataToShow, setDataToShow] = useState([])
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel",
    },
  };

  function addform() {
    setformSwitch(prevState => !prevState);
  }

  function deleteconfirmation() {
    confirm("Press Ok if you want to delete or press Cancel for going back.");
  }

  React.useEffect(() => {
    getAllDetailsApi()
      .then((res) => {
        console.log(res.data)
        setDataToShow([...res.data])
      })
      .catch((e) => {
        console.log(e)
      })
  },[])
  return (
    <>
      <div className="listing-table">
        <div className="table-card">
          <div className="table-head pb-4 d-flex justify-content-end">
            {/* <h3>{formSwitch ? "Listing Table" : "Post Form"}</h3> */}
            <a
              href='javascript:void("0");'
              className="btn bg-red text-white"
              onClick={addform}
            >
              Add
            </a>
          </div>
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
                    {/* <th scope="row">1</th> */}
                    <td>
                      <b>Business Name</b>
                    </td>
                    <td>
                      <b>City</b>
                    </td>
                    <td>
                      <b>State</b>
                    </td>
                    <td>
                      <b>Popularity Count</b>
                    </td>
                    <td>
                      <b> </b>
                    </td>
                  </tr>
                  {dataToShow.length>0 ? dataToShow.map((item, index) => {
                    return <tr key={index}>
                      <td>
                        {/* <img src="./img/icons8-user-48.png" height={"40px"} /> */}
                        {item.businessName?item.businessName:'N/A'}
                      </td>
                      <td>{item.city?item.city:'N/A'}</td>
                      <td>{item.state?item.state:'N/A'}</td>
                      <td>{item.popularCount?item.popularCount:0}</td>
                      <td>
                        <div className="btn-group">
                          <a href="#" className="icon view-icon">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </a>
                          <a href="#" className="icon edit-icon">
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </a>
                          <a
                            href="#"
                            className="icon trash-icon"
                            onClick={deleteconfirmation}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  })

                    : <center>No Data</center>}
                


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Listtable