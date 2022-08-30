import React from "react";

const ListingForm = () => {
  return (
    <>
      {/* <div className="Background_color"> */}
      <div className="inner">
        <div className="content">
          <div className="container">
            <div className="post-form px-5 py-2 ">
              <h2 className="text-center">Post Form</h2>
              <form action="#" />
              <div class="mb-3 mt-3">
                <label for="text">Business Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="Business"
                  name="text"
                />
              </div>
              <div className="mb-3">
                <label for="text">Street Address</label>
                <input
                  type="password"
                  className="form-control"
                  id="text"
                  placeholder="Address"
                  name="text"
                />
              </div>
              <div className="mb-3">
                <label for="states"> Select State</label>
                <select name="states" id="states" className="form-control">
                  <option value="Alabama">Alabama</option>
                  <option value="Alaska">Alaska</option>
                  <option value="Arizona">Arizona</option>
                  <option value="Arkansas">Arkansas</option>
                  <option value="Colorado">Colorado</option>
                  <option value="Connecticut">Connecticut</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Hawaii">Hawaii</option>
                  <option value="Idaho">Idaho</option>
                  <option value="IllinoisIndiana">IllinoisIndiana</option>
                  <option value="Iowa">Iowa</option>
                  <option value="Kansas">Kansas</option>
                  <option value="Louisiana">Louisiana</option>
                  <option value="Maine">Maine</option>
                  <option value="Maryland">Maryland</option>
                  <option value="Massachusetts">Massachusetts</option>
                  <option value="Michigan">Michigan</option>
                  <option value="Minnesota">Minnesota</option>
                  <option value="Mississippi">Mississippi</option>
                  <option value="MontanaNebraska">MontanaNebraska</option>
                  <option value="New Hampshire">New Hampshire</option>
                  <option value="New Jersey">New Jersey</option>
                  <option value="New Mexico">New Mexico</option>
                  <option value="New York">New York</option>
                  <option value=" North Dakota"> North Dakota</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Oklahoma">Oklahoma</option>
                  <option value="Oregon">Oregon</option>
                  <option value="PennsylvaniaRhode Island">
                    PennsylvaniaRhode Island
                  </option>
                  <option value="South Carolina">South Carolina</option>
                  <option value="South Dakota">South Dakota</option>
                  <option value="Texas">Texas</option>
                  <option value="Utah">Utah</option>
                  <option value="Vermont">Vermont</option>
                  <option value="Virginia">Virginia</option>
                  <option value="Washington">Washington</option>
                  <option value="West Virginia">West Virginia</option>
                  <option value="Wisconsin">Wisconsin</option>
                  <option value="Wyoming">Wyoming</option>
                </select>
              </div>
              <div className="mb-3">
                <label for="cities"> Select City</label>
                <select
                  name="cities"
                  id="cities"
                  className="form-control"
                ></select>
              </div>
              <div className="mb-3">
                <label for="text">Zipcode</label>
                <input
                  id="zip"
                  name="zip"
                  className="form-control"
                  type="number"
                  pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
                />
              </div>
              <div className="mb-3">
                <label for="text">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="Location"
                  name="text"
                />
              </div>

              <div className="price mb-3">
                <label for="price">Price</label>
                <select name="price" id="price" className="form-control">
                  <option value="$10">$10</option>
                  <option value="$20">$20</option>
                  <option value="$30">$30</option>
                  <option value="$40">$40</option>
                </select>
              </div>
              <div className="mb-3">
                <label for="text">Yelp URL</label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  placeholder="URL"
                  name="text"
                />
              </div>
              <div className="mb-3">
                <label for="food">Food Options</label>
                <select name="food" id="food" className="form-control">
                  <option value="American">American</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Korean">Korean</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Latin American">Latin American</option>
                  <option value="Fusion">Fusion</option>
                  <option value="Boba & Tea">Boba & Tea</option>
                  <option value="Coffee & Tea">Coffee & Tea</option>
                  <option value="Vietnamese">Vietnamese</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="Filipino">Filipino</option>
                  <option value="Hawaiian">Hawaiian</option>
                  <option value="Italian">Italian</option>
                  <option value="Thai">Thai</option>
                  <option value="Indian">Indian</option>
                </select>
              </div>
              <div className="mb-3">
                <label for="Activity">Activity Type</label>
                <select name="Activity" id="Activity" className="form-control">
                  <option value="Low Energy">Low Energy</option>
                  <option value="Mid Energy">Mid Energy</option>
                  <option value="High Energy">High Energy</option>
                  <option value="Adrenaline Junky">Adrenaline Junky</option>
                </select>
              </div>

              {/* Popular or Hidden */}

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <form />
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default ListingForm;
