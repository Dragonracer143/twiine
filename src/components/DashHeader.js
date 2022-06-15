import React from 'react'

function DashHeader(props) {
  return (
    <nav className="bg-red">
            <div className="container">
              <div className="d-flex justify-content-between py-3 align-items-center">
                <div className="title-bar">
                <a className="d-inline-block text-white" href="#" onClick={props.togglefn}>
                     <i className="fa fa-bars" aria-hidden="true"></i>
                </a>
                  {/* <a className="mobile-menu-icon " href="#">
                    <img
                      src="images/toggle.png"
                      className="img-fluid"
                      width="20px"
                    />
                  </a> */}
                </div>
                <div id="navbar-custom">
                  <ul className="d-flex justify-content-center align-items-center mb-0">
                    <li className="nav-item pl-lg-4 pr-2">
                      <a className="account-name d-inline-block" href="#">
                        <i className="fa fa-user-circle" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
  )
}

export default DashHeader