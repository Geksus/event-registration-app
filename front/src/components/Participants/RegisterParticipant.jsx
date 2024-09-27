import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import api from "../../api";

export default function RegisterParticipant(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [referer, setReferer] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const isResourceDataInvalid = () => {
    return [name, email, birthDate, referer].some((item) => item === "");
  };

  const isNameValid = () => {
    const regex = /^$|^[a-zA-Z ]+$/;
    return regex.test(name);
  };

  const isEmailValid = () => {
    const regex =
      /^$|^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const register = async () => {
    const params = {
      full_name: name,
      email: email,
      date_of_birth: birthDate,
      referral_source: referer,
      event_id: props.event_id,
    };

    try {
      await api.post(`/:${props.event_id}/register`, params);
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button variant="outline-primary" onClick={() => handleShow()}>
        Register
      </Button>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="registerToEventName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoFocus
                isInvalid={!isNameValid()}
              />
              <Form.Control.Feedback type="invalid">
                Invalid name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerToEventEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                isInvalid={!isEmailValid()}
              />
              <Form.Control.Feedback type="invalid">
                Invalid email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerToEventDate">
              <Form.Label>Birth date:</Form.Label>
              <Form.Control
                placeholder="YYY-MM-DD"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Where did you hear about this event?</Form.Label>
              <Form.Check
                type={"radio"}
                id={"social"}
                label="Social media"
                checked={referer === "social"}
                onChange={() => setReferer("social")}
              />
              <Form.Check
                type={"radio"}
                id={"friends"}
                label="Friends"
                checked={referer === "friends"}
                onChange={() => setReferer("friends")}
              />
              <Form.Check
                type={"radio"}
                id={"myself"}
                label="Found myself"
                checked={referer === "myself"}
                onChange={() => setReferer("myself")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant={isResourceDataInvalid() ? "primary disabled" : "primary"}
            onClick={register}
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
