import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Navbar, Col, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import * as action from "../redux/actioncCeator";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
import Main from "./Main";
function UserInput(props) {
  const [nameVal, setNameVal] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState("select the gender");
  const [hobbies, setHobbies] = useState([]);

  const [college, setCollege] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: "Select College",
    value: "Select College ",
  });

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  const fetchData = (inputValue, callback) => {
    setTimeout(() => {
      fetch("http://universities.hipolabs.com/search?name=" + inputValue, {
        method: "GET",
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          const tempArray = [];
          if (data) {
            if (data.length) {
              data.forEach((element) => {
                tempArray.push({
                  label: `${element.name}`,
                  value: element.name,
                });
              });
            } else {
              tempArray.push({
                label: `${data.name}`,
                value: data.name,
              });
            }
          }

          callback(tempArray);
        })
        .catch((error) => {
          console.log(error, "catch the hoop");
        });
    }, 1000);
  };
  const openModal = () => {
    setShow(true);
  };

  const clickingsubmit = (e) => {
    const data = {
      id: new Date(),
      nameVal,
      addressVal,
      date,
      gender,
      college,
      editing: false,
    };
    props.addUser(data);
    setShow(false);
    setAddressVal("");
    setNameVal("");
    setDate(null);
    setSelectedOption({ label: "Select College", value: "Select College " });
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
      setCollege(selectedOption.value);
    }
  };
  const hobbiesChecked = (event) => {
    const target = event.target;
    var values = target.value;

    var hob = [];
    var a = 0;
    if (target.checked) {
      hob.push(...hobbies, values);
      setHobbies(hob);
    } else {
      console.log(a);
    }
  };
  let val = props.post;
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
                  scrollableMonthYearDropdown
                />
              </Form.Group>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                <Form.Label>College</Form.Label>
                <AsyncSelect
                  value={selectedOption}
                  loadOptions={fetchData}
                  onChange={handleSelectChange}
                  isSearchable={true}
                  defaultOptions={true}
                />
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
                value="Reading"
                label="Reading"
                type="checkbox"
                id={`custom-inline-checkbox-1`}
                onChange={hobbiesChecked}
              />
              <Form.Check
                custom
                inline
                value="Gaming"
                label="Gaming"
                type="checkbox"
                id={`custom-inline-checkbox-2`}
                onChange={hobbiesChecked}
              />
              <Form.Check
                custom
                inline
                value="Traveling"
                label="Traveling"
                type="checkbox"
                id={`custom-inline-checkbox-3`}
                onChange={hobbiesChecked}
              />
              <Form.Check
                custom
                inline
                value="Drawing"
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
      {console.log(props.post)}
      <Main />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    post: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(action.addUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
