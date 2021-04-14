import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Nav, Navbar, Alert, Container } from "react-bootstrap";
import * as ROUTES from "../constants/routes";
import Logo from "./Logo";
import "../styles/global.css";
import { HomeButton, SignOutButton } from "./Buttons";

import { useAuth } from "../context/AuthContext";

export default function Header() {
  const history = useHistory();
  const [error, setError] = useState("");
  const { logout } = useAuth();

  async function handleSignout() {
    setError("");

    try {
      await logout();
      history.push(ROUTES.LOGIN);
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="bottomBorder">
      <Container>
        <Navbar collapseOnSelect expand="md" bg="" variant="light">
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="justify-content-end"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Col>
                <Link to={ROUTES.DASHBOARD}>
                  <HomeButton />
                </Link>
              </Col>
              <Col>
                <div onClick={handleSignout}>
                  <SignOutButton />
                  {error && <Alert variant="danger">{error}</Alert>}
                </div>
              </Col>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
