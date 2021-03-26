import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

function Main() {
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">MindBrowser</Navbar.Brand>

        <Button variant="outline-primary" onClick={openModal}>
          AddItem
        </Button>
      </Navbar>
    </div>
  );
}

export default Main;
