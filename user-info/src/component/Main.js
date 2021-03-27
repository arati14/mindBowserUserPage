import React from "react";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteUser } from "../redux/actioncCeator";

function Main(props) {
  console.log(props.post);

  let reversed = [...props.post].reverse();

  const deleteOnClickUser = (event) => {
    props.deleteUser(event.target.value);
  };

  return (
    <div>
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
              <td>{val.date.toJSON().slice(0, 10).replace(/-/g, "/")}</td>
              <td>hhh</td>
              <td>
                {" "}
                <Button
                  variant="danger"
                  value={val.id}
                  onClick={deleteOnClickUser}
                >
                  Delete
                </Button>{" "}
                <Button variant="info" value={val.id}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
