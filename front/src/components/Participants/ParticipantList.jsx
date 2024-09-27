import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import api from "../../api";

export default function ParticipantList() {
  const { event_id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventName, setEventName] = useState("");
  const [foundParticipants, setFoundParticipants] = useState([]);

  const searchParticipants = (str) => {
    const filteredParticipants = participants.filter(
      (p) =>
        p.full_name.toLowerCase().includes(str.toLowerCase()) ||
        p.email.toLowerCase().includes(str.toLowerCase()),
    );
    setFoundParticipants(filteredParticipants);
  };

  const fetchParticipants = async () => {
    const params = {
      event_id: event_id,
    };
    try {
      const response = await api.get(`/${event_id}/participants`, params);
      setParticipants(response.data.participants);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  const fetchEventName = async () => {
    try {
      const response = await api.get(`/events/${event_id}`);
      setEventName(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
    fetchEventName();
  }, []);

  if (isLoading) {
    return <p>Loading participants...</p>;
  }

  if (participants.length === 0) {
    return <p>No participants found for this event.</p>;
  }

  const objectForRendering =
    foundParticipants.length === 0 ? participants : foundParticipants;

  console.log(objectForRendering);

  return (
    <Container>
      <Row className="p-2 m-2">
        <h1 className="border-bottom">Participants for {eventName.title}</h1>
      </Row>
      <Row className="p-2 m-2">
        <Form>
          <Form.Group style={{ display: "flex", alignItems: "center" }}>
            <Form.Label>Search participants: </Form.Label>
            <Form.Control
              style={{ width: "15em", marginLeft: "1em" }}
              onInput={(event) => searchParticipants(event.target.value)}
            />
          </Form.Group>
        </Form>
      </Row>
      <Row className="p-2 m-2">
        {objectForRendering.map((participant) => (
          <Card
            key={participant.id}
            style={{ width: "18em" }}
            className="m-2 p-0"
          >
            <Card.Text className="pt-2 ps-2">
              <h2>{participant.full_name}</h2>
            </Card.Text>
            <Card.Footer>{participant.email}</Card.Footer>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
