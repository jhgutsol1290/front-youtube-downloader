import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top" className="mb-5">
        <Navbar.Brand as={Link} to={"/"}>
          YouTube Downloader
        </Navbar.Brand>
        <Nav className="ml-auto">
          <NavLink
            to={"/"}
            className="mr-2 pr-3"
            style={{ textDecoration: "none", color: "#fff", cursor: "pointer" }}
          >
            Download Video
          </NavLink>
          <NavLink
            to={"/video-list"}
            style={{ textDecoration: "none", color: "#fff", cursor: "pointer" }}
          >
            List downloads
          </NavLink>
        </Nav>
      </Navbar>
    </>
  );
};

export default NavigationBar;
