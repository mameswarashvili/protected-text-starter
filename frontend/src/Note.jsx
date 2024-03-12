import { useState } from "react"
import { Button, Form, Modal, Container } from "react-bootstrap"

export const Note = () => {
  const [note, setNote] = useState("")
  const [password, setPassword] = useState("")
  const [showModal, setShowModal] = useState(true)

  const createNote = async (event) => {
    // todo...
  }

  const getNote = async (event) => {
    // todo...
  }

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
                <Form.Label htmlFor="password">New password</Form.Label>
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
                  onClick={() => setShowModal(false)}
                >
                  Create
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
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
  )
}
