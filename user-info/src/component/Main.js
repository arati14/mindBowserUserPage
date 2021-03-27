import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import * as action from "../redux/actioncCeator";
import DatePicker from "react-datepicker";
import AsyncSelect from "react-select/async";
function Main(props, no) {
  console.log(props);
  console.log(no);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [nameVal, setNameVal] = useState("");
  const [addressVal, setAddressVal] = useState("");

  const [date, setDate] = useState(null);
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [extraHobby, setExtraHobby] = useState("");
  const [college, setCollege] = useState("");
  const [selectedOption, setSelectedOption] = useState({
    label: "Select College",
    value: "Select College ",
  });

  useEffect(() => {
    if (id !== "") {
      const dummyUser = props.post.find((val) => val.id == id);
      console.log(dummyUser);
      console.log(dummyUser.date);
      setNameVal(dummyUser.nameVal);
      setAddressVal(dummyUser.addressVal);
      setSelectedOption({
        label: dummyUser.college,
        value: dummyUser.college,
      });
      setHobbies({ value: dummyUser.hobbies });
      setCollege(dummyUser.college);
    }
  }, [id]);

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
    });
  };
  let reversed = [...props.post].reverse();
  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
      setCollege(selectedOption.value);
    }
  };
  const deleteOnClickUser = (event) => {
    props.deleteUser(event.target.value);
  };
  const editOnClickUser = (event) => {
    setShow(true);
    setId(event.target.value);
    console.log(event.target.value);
  };
  const clickingsubmit = (e) => {
    setShow(false);
    // const dataq = Object.assign(props.data, {
    //   nameVal: nameVal,
    //   addressVal: addressVal,
    //   date: date,
    //   gender: gender,
    //   college: college,
    //   hobbies: hobbies,
    // });
    const data = {
      nameVal,
      addressVal,
      date,
      gender,
      college,
      hobbies: hobbies,
    };
    console.log(data);
    // console.log(dataq);
    props.updateUser(id, data);
  };
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
  const extraHobbyHandler = (event) => {
    const target = event.target;
    let value = target.value;
    setExtraHobby(value);
  };

  return (
    <div>
      <h3>USER INFO</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>Name</th>
            <th>Gender</th>
            <th>College</th>
            <th>Dob</th>
            <th>Hobbies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reversed.map((val, index) => (
            <tr>
              <td>{index}</td>
              <td>{val.nameVal}</td>
              <td>{val.gender}</td>
              <td>{val.college}</td>
              <td>{val.date}</td>
              <td>{val.hobbies}</td>
              <td>
                {" "}
                <Button
                  variant="danger"
                  value={val.id}
                  onClick={deleteOnClickUser}
                >
                  Delete
                </Button>{" "}
                <Button variant="info" value={val.id} onClick={editOnClickUser}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
          Enter The User Details
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Name"
                value={nameVal}
                pattern="[A-Za-z]{3}"
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
                  value={gender}
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
                onChange={extraHobbyHandler}
              />
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ background: "#262626" }}>
          <Button variant="warning" onClick={clickingsubmit}>
            Save Update
          </Button>
        </Modal.Footer>
      </Modal>
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
    deleteUser: (id) => dispatch(action.deleteUser(id)),
    updateUser: (id, data) => dispatch(action.updateUser(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
