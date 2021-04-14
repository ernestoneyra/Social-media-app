import useUser from "../../hooks/use-user";
import User from "./User";
import Suggestions from "./Suggestions";
import { Row, Navbar, Col } from "react-bootstrap";

export default function Sidebar() {
  const {
    user: { fullName, username, userId, following, docId },
  } = useUser();

  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="" variant="light">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="justify-content-start "
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-start "
        >
          <Row>
            <Col>
              <User username={username} fullName={fullName} />
            </Col>
            <Col>
              <Suggestions
                userId={userId}
                following={following}
                loggedInUserDocId={docId}
              />
            </Col>

            <Col></Col>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
