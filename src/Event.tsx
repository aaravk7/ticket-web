import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import { SERVER_URL } from "./App";
import { AppStateContext } from "./context/AuthContext";
import useFetch from "./hooks/useFetch";
import { IEventDetails } from "./types";

const Event = () => {
  const { eventSlug } = useParams();
  const appState = useContext(AppStateContext);
  const { data, loading, error } = useFetch<{ event: IEventDetails }>(
    `${SERVER_URL}/events/${eventSlug}`
  );

  if (!appState.user) {
    return <Navigate to="/login" />;
  }

  if (loading) return <>Loading</>;
  if (error) return <>{error.message}</>;
  if (!data) return <>Some error occurred</>;
  const { event } = data;
  return (
    <Container className="d-flex align-items-center flex-column gap-3">
      <img
        src={SERVER_URL.split("/api")[0] + event.poster}
        alt={event.name}
        style={{
          height: "400px",
          maxWidth: "400px",
          objectFit: "cover",
        }}
      />
      <h2 className="display-6">{event.name}</h2>
      <p>{event.description}</p>
      <p> Start : {new Date(event.startDate).toDateString()}</p>
      <p> End : {new Date(event.endDate).toDateString()}</p>
      <Link to="reserve" className="btn btn-dark">
        Reserve Tickets
      </Link>
    </Container>
  );
};

export default Event;
