import { FC } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../App";

import { IEvent } from "../types";

const EventCard: FC<{ event: IEvent }> = ({ event }) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={SERVER_URL.split("/api")[0] + event.poster}
      />
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text>
          Start : {new Date(event.startDate).toDateString()}
        </Card.Text>
        <Card.Text>Start : {new Date(event.endDate).toDateString()}</Card.Text>
        <Link className="btn btn-primary" to={event.slug}>
          View Details
        </Link>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
