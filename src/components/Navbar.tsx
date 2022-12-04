import { FC, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../App";
import { AppStateContext, AppDispatchContext } from "../context/AuthContext";

const Header: FC = () => {
  const navigate = useNavigate();
  const appState = useContext(AppStateContext);
  const appAction = useContext(AppDispatchContext);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.message) {
        appAction({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Ticket Booking
        </Navbar.Brand>
        <Nav className="ml-auto">
          {!appState.user ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/sign-up">
                SignUp
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
