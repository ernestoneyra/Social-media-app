import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Form, Alert } from "react-bootstrap";
import FirebaseContext from "../context/Firebase";
import * as ROUTES from "../constants/routes";
import Logo from "../components/Logo";

export default function ResetPassword() {
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /////////////////////////////////////////////////
  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await firebase.auth().sendPasswordResetEmail(email);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed to Log in. Check password and email ");
    }
    setLoading(false);
  };
  ////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    document.title = "Reset Password - Social App";
  }, []);
  ////////////////////////////////////////////////////////////////////

  return (
    <>
      <Logo />
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleReset}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                placeholder="Email Adress"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                required
              />
            </Form.Group>

            <Button disabled={loading} className="w-100 btn-info" type="submit">
              Reset password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to={ROUTES.LOGIN}>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Create account</Link>
      </div>
    </>
  );
}