import React from 'react';
import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";
const Component = styled(AppBar)`
  background-color: #fff;
  color: #000;
`;
const Container = styled(Toolbar)`
  margin: auto;
  & > a {
    margin-right: 50px;
    text-decoration: none;
    color: inherit;
  }
`;
const Header = () => {
  return (
    <div>
      <Component>
        <Container>
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/logout">LOGOUT</Link>
        </Container>
      </Component>
    </div>
  );
};
export default Header;
