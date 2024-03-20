import { useState, useEffect } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import axios from "axios";

export const Note = () => {
  const [note, setNote] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [fetchedNote, setFetchedNote] = useState("");

  const createNote = async (event) => {
    event.preventDefault();
  };

  const getNote = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/note-status/:title", {
        params: {
          title: password 
        }
      });
      if (response.data) {
        const noteResponse = await axios.get("http://localhost:3000/note/:title", {
          params: {
            title: password
          }
        });
        setFetchedNote(noteResponse.data.note);
        setShowModal(false);
      } else {
        alert("Note not found!");
      }
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  return (
    <Container>
      <header className="my-4 d-flex justify-content-between">
        <h1 className="fs-4">🔐 Protected Text</h1>
      </header>
      <main>
        <>
          <Modal show={showModal} size="sm">
            <form onSubmit={getNote}>
              <Modal.Header>
                <Modal.Title>Create new site?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Great! This site doesn&apos;t exist, it can be yours!</p>
                <Form.Label htmlFor="password">Enter existing password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="passowrd"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                >
                  Get Note
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
          {fetchedNote && (
            <div className="mt-3">
              <h2>Fetched Note</h2>
              <p>{fetchedNote}</p>
            </div>
          )}
          <form onSubmit={createNote}>
            <Form.Control
              value={note}
              onChange={(e) => setNote(e.target.value)}
              name="note"
              as="textarea"
              id="note"
              cols="30"
              rows="10"
              placeholder="Your text goes here..."
            />
            <Button className="mt-2 d-block ms-auto" type="submit">
              Save
            </Button>
          </form>
        </>
      </main>
    </Container>
  )};