import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import RegisterParticipant from "../Participants/RegisterParticipant";
import { useNavigate } from "react-router-dom";

export default function SingleEvent(props) {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "18em" }} className="m-2 p-0">
      <Card.Header className={"bg-info-subtle"}>{props.title}</Card.Header>
      <Card.Body className="bg-success-subtle">
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer className={"d-flex justify-content-between bg-dark-subtle"}>
        <RegisterParticipant event_id={props.event_id} />
        <Button
          size="sm"
          variant="outline-dark"
          onClick={() => navigate(`/${props.event_id}/participants`)}
        >
          Participants
        </Button>
      </Card.Footer>
    </Card>
  );
}
