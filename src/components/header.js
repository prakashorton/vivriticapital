import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            Vivrthi Capital Frontend Hiring Challenge
          </a>
        </div>
        <ul className="nav navbar-nav">
          <li className="">
            <NavLink to="/" exact>
              Todo
            </NavLink>
          </li>
          <li>
            <NavLink to="/books">GoogsReads</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
