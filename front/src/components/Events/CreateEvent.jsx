import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from "uuid";
import api from "../../api";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [event_date, setEvent_date] = useState("");
  const [organizer_id, setOrganizer_id] = useState("");
  const [organizers, setOrganizers] = useState([]);

  const navigate = useNavigate();

  const fetchOrganizers = async () => {
    try {
      const response = await api.get("/organizers");
      setOrganizers(response.data.organizers);
      console.log(response.data.organizers);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createEvent = async () => {
    const body = {
      id: uuidv4(),
      title: title,
      description: description,
      event_date: event_date,
      organizer_id: organizer_id,
    };

    try {
      await api.post("/events", body);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchOrganizers();
  }, []);

  return (
    <>
      <Row className="d-flex justify-content-center">
        <Card className="w-25 h-25 mt-5 p-0">
          <Card.Header>Create new event</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  value={event_date}
                  onChange={(event) => setEvent_date(event.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Organizer</Form.Label>
                <Form.Select
                  onChange={(event) => setOrganizer_id(event.target.value)}
                >
                  <option value="">--Select organizer--</option>
                  {organizers.map((org, index) => (
                    <option key={index} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Button
              type="submit"
              onClick={createEvent}
              disabled={[title, description, event_date, organizer_id].some(
                (item) => item === "",
              )}
            >
              Create
            </Button>
          </Card.Footer>
        </Card>
      </Row>
    </>
  );
}
