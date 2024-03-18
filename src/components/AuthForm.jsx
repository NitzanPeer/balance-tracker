import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Form, Button, Card, CardBody, FormLabel } from "react-bootstrap";
// import { UserAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../contexts/AuthContext";

export default function AuthForm({ signUpOrSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { createUser } = UserAuth()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (signUpOrSignIn === "Sign Up") {
        await createUserWithEmailAndPassword(auth, email, password);
        // await createUser(email, password);
        navigate("/home");
        console.log(`${email} successfully signed up`);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home");
        console.log(`${email} successfully signed in`);
      }
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
    }
  };

  return (
    <div className={`auth-form-container container`}>
      {/* <div className={`auth-form-wrapper`}> */}
      <Card className={`auth-form-card`}>
        <CardBody>
          <h2>{signUpOrSignIn}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="group">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="on"
              ></Form.Control>
            </Form.Group>{" "}
            <Form.Group className="group">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="on"
              ></Form.Control>
            </Form.Group>{" "}
            <Button type="submit">{signUpOrSignIn}</Button>
            {signUpOrSignIn === "Sign Up" && (
              <p>
                Already have an account? <a href="/">Sign in</a>
              </p>
            )}
            {signUpOrSignIn === "Sign In" && (
              <p>
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            )}
            <p>
              Guest? <a href="/home">Click Here</a>
            </p>
          </Form>
        </CardBody>
      </Card>
      {/* </div> */}
    </div>
  );
}
