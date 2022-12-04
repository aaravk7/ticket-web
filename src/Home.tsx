import { useContext } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { SERVER_URL } from "./App";
import EventCard from "./components/EventCard";
import { AppStateContext, AppDispatchContext } from "./context/AuthContext";
import useFetch from "./hooks/useFetch";
import { IEvent } from "./types";

const Home = () => {
  const appState = useContext(AppStateContext);
  const { data, loading, error } = useFetch<{ events: IEvent[] }>(
    `${SERVER_URL}/events`
  );

  if (!appState.user) {
    return <Navigate to="/login" />;
  }

  if (loading) return <>Loading</>;
  if (error) return <>{error.message}</>;
  if (!data) return <>Some error occurred</>;
  const { events } = data;
  return (
    <Container className="p-5">
      <h1 className="display-5 text-center">Events</h1>
      <Row className="g-3">
        {events.map((event) => (
          <div key={event._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <EventCard event={event} />
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
