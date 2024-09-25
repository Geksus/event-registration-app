import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";

export default function SingleEvent(props) {
  return (
    <Card style={{ width: "18em" }} className="m-2 p-0">
      <Card.Header className={"bg-info-subtle"}>{props.title}</Card.Header>
      <Card.Body className="bg-success-subtle">
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer className={"d-flex justify-content-between bg-dark-subtle"}>
        <Button size="sm" variant="outline-primary">
          Register
        </Button>
        <Button size="sm" variant="outline-dark">
          Participants
        </Button>
      </Card.Footer>
    </Card>
  );
}
