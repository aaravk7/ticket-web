import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";

import { SERVER_URL } from "./App";
import { AppDispatchContext, AppStateContext } from "./context/AuthContext";

const SignUp: FC = () => {
  const appState = useContext(AppStateContext);
  const appAction = useContext(AppDispatchContext);
  const [state, setState] = useState<{
    email: string;
    password: string;
    fullName: string;
    mobile?: number;
  }>({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${SERVER_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
        credentials: "include",
      });
      const data = await response.json();
      if (!("errors" in data)) {
        appAction({
          type: "LOGIN",
          payload: data,
        });
      } else {
        alert(data.errors[0].msg);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  if (appState.user) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="p-5">
      <h1 className="display-5 text-center">Sign Up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="fullName"
            value={state.fullName}
            onChange={handleInputChange}
            placeholder="Enter full name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            value={state.password}
            onChange={handleInputChange}
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            required
            type="number"
            name="mobile"
            value={state.mobile}
            onChange={handleInputChange}
            placeholder="Enter mobile number without country code"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUp;
