import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarElements } from "./NavbarElements";
import "../../styles/Navbar.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { blue } from "@mui/material/colors";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  // function closeApp() {
  //   var win = window.open(
  //     "",
  //     "_self"
  //   ); /* url = "" or "about:blank"; target="_self" */
  //   win.close();
  // }

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bar" onClick={showSidebar}>
          <MenuOutlinedIcon fontSize="medium" sx={{ color: blue[200] }} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-item">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bar" onClick={showSidebar}>
              <CloseOutlinedIcon fontSize="medium" sx={{ color: blue[200] }} />
            </Link>
          </li>
          {SidebarElements.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path} onClick={showSidebar}>
                  {item.title}
                </Link>
              </li>
            );
          })}
          {/*<li className="navbar-toggle">*/}
          {/*  <Link*/}
          {/*    to="#"*/}
          {/*    className="menu-bar"*/}
          {/*    // onClick={closeApp}*/}
          {/*  >*/}
          {/*    Close app*/}
          {/*  </Link>*/}
          {/*</li>*/}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
