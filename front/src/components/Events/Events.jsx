import { useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import SingleEvent from "./SingleEvent";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortedEvents, setSortedEvents] = useState([]);

  const navigate = useNavigate();

  function sortEvents(type) {
    let currentSortedEvents = [...events];

    switch (type) {
      case "title":
        currentSortedEvents.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "date":
        currentSortedEvents.sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date),
        );
        break;
      case "organizer":
        currentSortedEvents.sort((a, b) =>
          a.organizer_id.localeCompare(b.organizer_id),
        );
        break;
      case "---":
        currentSortedEvents = events;
        break;
      default:
        break;
    }

    setSortedEvents(currentSortedEvents);
  }

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data.events);
      setSortedEvents(response.data.events);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Row className="p-2 m-2">
        <Form style={{ width: "20em" }}>
          <Form.Group>
            <Form.Label>Sort by: </Form.Label>
            <Form.Select onChange={(event) => sortEvents(event.target.value)}>
              <option value="---">---</option>
              <option value="title">Title</option>
              <option value="date">Date</option>
              <option value="organizer">Organizer</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Row>
      {events && events.length > 0 ? (
        <>
          <Row className="p-2 m-2">
            {sortedEvents.map((item) => (
              <SingleEvent
                key={item.id}
                title={item.title}
                description={item.description}
                event_id={item.id}
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
    </Container>
  );
}
