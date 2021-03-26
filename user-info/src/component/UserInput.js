import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Navbar, Col, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import * as action from "../redux/actioncCeator";
import DatePicker from "react-datepicker";
function UserInput(props) {
  const [nameVal, setNameVal] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState("select the gender");
  const [hobbies, setHobbies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [col, setCollege] = useState("");
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?name=Biju")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  const openModal = () => {
    setShow(true);
  };

  const clickingsubmit = (e) => {
    props.addUser(nameVal, addressVal, date, gender);
    setShow(false);
    setAddressVal("");
    setNameVal("");

    setDate(null);
  };
  const hobbiesChecked = (event) => {
    const target = event.target;
    var value = target.value;
    var hob = [];
    var a = 0;
    if (target.checked) {
      hob[value] = value;
      setHobbies(hob);
      a = a + 1;
    } else {
      console.log(a);
    }
    console.log(hob);
  };
  console.log(hobbies);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">MindBrowser</Navbar.Brand>

        <Button variant="outline-primary" onClick={openModal}>
          AddItem
        </Button>
      </Navbar>
      <Modal
        show={show}
        onHide={clickingsubmit}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>Enter The User Details</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Name"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="enter address"
                value={addressVal}
                onChange={(e) => setAddressVal(e.target.value)}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formDate">
                <Form.Label>Date of Birth</Form.Label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  isClearable
                  showYearDropdown
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                <Form.Label>School</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => setCollege(e.target.value)}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Others">Others</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Others">Others</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form inline>
              <Form.Label>Select hobbies :</Form.Label>
              {""}
              <Form.Check
                custom
                inline
                value="3"
                label="Reading"
                type="checkbox"
                id={`custom-inline-checkbox-1`}
                onChange={hobbiesChecked}
              />
              <Form.Check
                custom
                inline
                value="0"
                label="Gaming"
                type="checkbox"
                id={`custom-inline-checkbox-2`}
                onChange={hobbiesChecked}
              />
              <Form.Check
                custom
                inline
                value="1"
                label="Traveling"
                type="checkbox"
                id={`custom-inline-checkbox-3`}
                onChange={hobbiesChecked}
              />
              <Form.Check
                custom
                inline
                value="2"
                label="Drawing"
                type="checkbox"
                id={`custom-inline-checkbox-4`}
                onChange={hobbiesChecked}
              />
              <Form.Label htmlFor="inlineFormInputName2" srOnly>
                hobbies
              </Form.Label>
              <Form.Control
                as="textarea"
                className="mb-2 mr-sm-2"
                id="inlineFormInputName2"
                placeholder="extra hobbies"
              />
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={clickingsubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {console.log(items)}
      {console.log(props)}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    name: state.name,
    address: state.address,
    date: state.date,
    gender: state.gender,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (nameVal, addressVal, date, gender) =>
      dispatch(action.addUser(nameVal, addressVal, date, gender)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
