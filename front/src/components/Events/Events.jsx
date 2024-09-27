import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Pagination, Row } from "react-bootstrap";
import SingleEvent from "./SingleEvent";
import api from "../../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortedEvents, setSortedEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(10);

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

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function createPagination() {
    const totalPages = Math.ceil(events.length / eventsPerPage);
    let items = [];

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>,
      );
    }
    return items;
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

  const fetchOrganizers = async () => {
    try {
      const response = await api.get("/organizers");
      setOrganizers(response.data.organizers);
      console.log(response.data.organizers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchOrganizers();
  }, []);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  if (isLoading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Container>
      <Row className="p-3 m-2 d-inline-flex">
        <Form.Label>Sort by: </Form.Label>
        <Form.Select onChange={(event) => sortEvents(event.target.value)}>
          <option value="---">---</option>
          <option value="title">Title</option>
          <option value="date">Date</option>
          <option value="organizer">Organizer</option>
        </Form.Select>
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

      {events && events.length > 0 ? (
        <>
          <Row className="p-2 m-2">
            {currentEvents.map((item) => (
              <SingleEvent
                key={item.id}
                title={item.title}
                description={item.description}
                event_id={item.id}
                organizer={
                  organizers.find((org) => org.id === item.organizer_id).name
                }
                date={item.event_date}
              />
            ))}
          </Row>
          <Row className="p-2 m-2">
            <Col className="d-flex justify-content-center">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                {createPagination()}
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <p>No events available</p>
      )}
    </Container>
  );
}
