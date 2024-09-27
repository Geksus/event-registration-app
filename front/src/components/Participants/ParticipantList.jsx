import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default function ParticipantList() {
  const { event_id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [eventName, setEventName] = useState("");

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
  }, [event_id]);

  if (isLoading) {
    return <p>Loading participants...</p>;
  }

  if (participants.length === 0) {
    return <p>No participants found for this event.</p>;
  }

  return (
    <Container>
      <Row className="p-2 m-2">
        <h1 className="border-bottom">Participants for {eventName.title}</h1>
      </Row>
      <Row className="p-2 m-2">
        {participants.map((participant) => (
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
