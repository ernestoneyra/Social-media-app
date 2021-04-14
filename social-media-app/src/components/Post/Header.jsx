import PropTypes from "prop-types";
import { Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header({ username }) {
  return (
    <>
      <Col className="d-flex  rounded ">
        <Link to={`/p/${username}`} className="row">
          <Image
            className="border border-danger w-25 rounded-circle "
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
          ></Image>
          <p className="ml-3 text-dark font-weight-bold">{username}</p>
        </Link>
      </Col>
    </>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
/*
 */
