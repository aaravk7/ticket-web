import { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { SERVER_URL } from "./App";
import { AppStateContext } from "./context/AuthContext";
import useFetch from "./hooks/useFetch";
import { IOrder } from "./types";

const Orders = () => {
  const appState = useContext(AppStateContext);
  const { data, loading, error } = useFetch<{ orders: IOrder[] }>(
    `${SERVER_URL}/orders`
  );

  if (!appState.user) return <Navigate to="/login" />;

  if (loading) return <>Loading</>;
  if (error) return <>{error.message}</>;
  if (!data) return <>Some error occurred</>;
  const { orders } = data;
  return (
    <Container>
      <Table striped bordered className="mt-5">
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Status</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{order.eventData.name}</td>
              <td>{new Date(order.ticketData.date).toDateString()}</td>
              <td>{order.ticketData.description}</td>
              <td>{order.status}</td>
              <td>Rs.{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Orders;
