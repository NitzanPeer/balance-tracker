import React, { useState } from "react";
import { auth } from "../firebase";
import { Form, Button, Card, CardBody, FormLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function AuthForm({ signUpOrSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (signUpOrSignIn === "Sign Up") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        const dataToSave = {
          email: email,
          transactions: [],
        };

        await setDoc(doc(db, "users", userId), dataToSave);

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

  const handleGuestSignIn = async () => {
    // Simulate signing in with mock guest data
    const guestEmail = "guest@example.com";
    const guestPassword = "guest1";

    try {
      await signInWithEmailAndPassword(auth, guestEmail, guestPassword);
      navigate("/home");
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
    }
  };

  return (
    <div className={`auth-form-container container`}>
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
              <div>
                <span>Already have an account?</span>
                <a href="/">Sign In</a>
              </div>
            )}
            {signUpOrSignIn === "Sign In" && (
              <div>
                <span>Don't have an account?</span>
                <a href="/signup">Sign Up</a>
              </div>
            )}
            <span>Guest?</span>
            <Link to="/home" onClick={handleGuestSignIn}>
              Click Here
            </Link>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
