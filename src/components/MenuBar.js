import "../App.css";

import { Routes, Route, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";

function MenuBar() {
  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div className="menu">
          <ul>
            <li>
              <MdHomeFilled />
              <span>
                <StyledLink to="/">Home</StyledLink>
              </span>
            </li>
            <li>
              <MdSearch />
              <span>
                <StyledLink to="/search">Search</StyledLink>
              </span>
            </li>
            <li>
              <IoLibrary />
              <span>
                <StyledLink to="/favorite">Favorite</StyledLink>
              </span> 
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: aliceblue;
`;

export default MenuBar;
