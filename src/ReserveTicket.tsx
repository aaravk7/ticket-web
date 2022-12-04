import { useContext, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { SERVER_URL } from "./App";
import { AppStateContext } from "./context/AuthContext";
import useFetch from "./hooks/useFetch";
import { ITicket } from "./types";

const ReserveTicket = () => {
  const { eventSlug } = useParams();
  const navigate = useNavigate();
  const appState = useContext(AppStateContext);
  const [selectedTickets, setSelectedTickets] = useState<
    { ticket: ITicket; quantity: number }[]
  >([]);
  const { data, loading, error } = useFetch<{ tickets: ITicket[] }>(
    `${SERVER_URL}/events/${eventSlug}/tickets`
  );

  const handleAddTicket = (ticket: ITicket) => {
    if (selectedTickets.find((item) => item.ticket._id === ticket._id)) {
      setSelectedTickets((prev) =>
        prev.map((item) =>
          item.ticket._id === ticket._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedTickets((prev) => [...prev, { ticket, quantity: 1 }]);
    }
  };

  const reduceQuantity = (ticketId: string) => {
    const ticket = selectedTickets.find((item) => item.ticket._id === ticketId);
    if (!ticket) return;
    if (ticket.quantity > 1) {
      setSelectedTickets((prev) =>
        prev.map((item) =>
          item.ticket._id === ticketId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setSelectedTickets((prev) =>
        prev.filter((item) => item.ticket._id !== ticketId)
      );
    }
  };

  const increaseQuantity = (ticketId: string) => {
    const ticket = selectedTickets.find((item) => item.ticket._id === ticketId);
    if (!ticket) return;
    if (ticket.quantity < ticket.ticket.availableQuantity) {
      setSelectedTickets((prev) =>
        prev.map((item) =>
          item.ticket._id === ticketId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      alert("Can not reserve more tickets than available");
    }
  };

  let totalPrice = 0;
  let totalQuantity = 0;
  const selectedTicketsRows = selectedTickets.map((ticket, index) => {
    const ticketPrice = ticket.ticket.price * ticket.quantity;
    totalQuantity += ticket.quantity;
    totalPrice += ticketPrice;
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{ticket.ticket.description}</td>
        <td>
          <Button
            size="sm"
            variant="danger"
            onClick={() => reduceQuantity(ticket.ticket._id)}
          >
            -
          </Button>
          &nbsp;&nbsp;
          {ticket.quantity}&nbsp;&nbsp;
          <Button
            size="sm"
            variant="success"
            onClick={() => increaseQuantity(ticket.ticket._id)}
          >
            +
          </Button>
        </td>
        <td>{ticketPrice}</td>
      </tr>
    );
  });

  const handleTicketReservation = async () => {
    if (selectedTickets.length === 0) return;
    const ticketId = selectedTickets[0].ticket._id;

    try {
      const response = await fetch(`${SERVER_URL}/tickets/${ticketId}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalPrice }),
        credentials: "include",
      });
      const data = await response.json();
      if (!("errors" in data)) {
        navigate("/orders");
      } else {
        alert(data.errors[0].msg);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  if (!appState.user) {
    return <Navigate to="/login" />;
  }

  if (loading) return <>Loading</>;
  if (error) return <>{error.message}</>;
  if (!data) return <>Some error occurred</>;
  const { tickets } = data;
  return (
    <Container className="p-5">
      <h1 className="text-center display-5">Reserve Tickets</h1>
      <Table striped bordered className="mt-5">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Date</th>
            <th>Description</th>
            <th>Price</th>
            <th>Available Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{new Date(ticket.date).toDateString()}</td>
              <td>{ticket.description}</td>
              <td>Rs.{ticket.price}</td>
              <td>{ticket.availableQuantity}</td>
              <td>
                <Button size="sm" onClick={() => handleAddTicket(ticket)}>
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedTickets.length > 0 ? (
        <div className="mt-5">
          <h2 className="display-6">Cart</h2>
          <Table bordered>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{selectedTicketsRows}</tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td>{totalQuantity}</td>
                <td>{totalPrice}</td>
              </tr>
            </tfoot>
          </Table>
          <Button variant="primary" onClick={handleTicketReservation}>
            Reserve
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default ReserveTicket;
