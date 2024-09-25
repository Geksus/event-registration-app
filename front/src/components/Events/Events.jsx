import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import SingleEvent from "./SingleEvent";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data.events);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {events && events.length > 0 ? (
        <>
          <Row className="p-2 m-2">
            {events.map((item) => (
              <SingleEvent
                key={item.id}
                title={item.title}
                description={item.description}
              />
            ))}
          </Row>
          <Row className="p-2 ms-3 d-flex justify-content-start">
            <Button
              type="button"
              style={{ width: "10em" }}
              onClick={() => navigate("/create-event")}
            >
              Create event
            </Button>
          </Row>
        </>
      ) : (
        <p>No events available</p>
      )}
    </>
  );
}
