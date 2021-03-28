import React, { useState } from "react";
import { Form, Button, Modal, Navbar, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as action from "../redux/actioncCeator";

import AsyncSelect from "react-select/async";
import Main from "./Main";
function validateText(str) {
  return /[^A-Za-z]/.test(str);
}
function UserInput(props) {
  const [nameVal, setNameVal] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState("select the gender");
  const [hobbies, setHobbies] = useState([]);
  const [extraHobby, setExtraHobby] = useState("");
  const [college, setCollege] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: "Select College",
    value: "Select College ",
  });
  const [showTable, setShowTable] = useState(false);
  const [error, setError] = useState([]);

  //to fetch the api data to show the data in asyn select

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

  //to open the modal

  const openModal = () => {
    setShow(true);
  };
  const hasError = (key) => {
    return error.indexOf(key) !== -1;
  };

  //on click submit

  const clickingsubmit = (e) => {
    var errors = [];

    //name
    if (nameVal === "") {
      errors.push("name");
    }
    if (addressVal === "") {
      errors.push("address");
    }
    if (date === null) {
      errors.push("date");
    }

    setError(errors);
    if (errors.length > 0) {
      return false;
    } else {
      setShow(false);
    }

    //validation for text field
    if (
      validateText(nameVal) ||
      validateText(addressVal) ||
      validateText(extraHobby)
    ) {
      alert("Enter only alphabets");
    } else {
      // temp object is created to assign the data to the state
      const data = {
        id: new Date(),
        nameVal,
        addressVal,
        date,
        gender,
        college,
        hobbies: hobbies.concat([extraHobby]),
      };
      props.addUser(data);
    }
    //re-intializing the form
    setAddressVal("");
    setNameVal("");
    setDate(null);
    setSelectedOption({ label: "Select College", value: "Select College " });
    setCollege("");
    setGender("");
    setHobbies("");
    setShowTable(true);
  };

  //handle college select option

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
      setCollege(selectedOption.value);
    }
  };
  //to check the hobby as well as add additional hobbies

  const hobbiesChecked = (event) => {
    const target = event.target;
    let values = target.value;

    let hob = [];

    if (target.checked) {
      hob.push(...hobbies, values);
      setHobbies(hob);
    } else {
      let index = hobbies.indexOf(target.value);
      hobbies.splice(index, 1);
      setHobbies([...hobbies]);
    }
  };
  //to handle extra hobby
  const extraHobbyHandler = (event) => {
    const target = event.target;
    let value = target.value;
    setExtraHobby(value);
  };

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        className="mr-sm-2"
        style={{ justifyContent: "flex-start" }}
      >
        <Navbar.Brand href="#home">MindBowser</Navbar.Brand>
        <div style={{ marginLeft: "1200px" }}>
          {" "}
          <Button variant="primary" onClick={openModal}>
            Add User
          </Button>
        </div>
      </Navbar>
      <Modal
        show={show}
        onHide={clickingsubmit}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          style={{ background: "#262626", color: "white" }}
          closeButton
        >
          <h4> Enter the Details </h4>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Name"
                value={nameVal}
                onChange={(e) => setNameVal(e.target.value)}
                className={
                  hasError("name") ? "form-control is-invalid" : "form-control"
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Address"
                value={addressVal}
                onChange={(e) => setAddressVal(e.target.value)}
                className={
                  hasError("address")
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formDate">
                <Form.Label>Date of Birth</Form.Label>

                <input
                  type="date"
                  name="dob"
                  onChange={(event) => setDate(event.target.value)}
                  className={
                    hasError("date")
                      ? "form-control is-invalid"
                      : "form-control"
                  }
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
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="exampleForm.ControlSelect2">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  custom
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select</option>
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
                placeholder="Extra Hobbies"
                onChange={extraHobbyHandler}
              />
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: "#262626" }}>
          <Button variant="primary" onClick={clickingsubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {console.log(showTable)}
      {showTable ? <Main /> : ""}
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
