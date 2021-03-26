import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { connect } from "react-redux";

function Main(props) {
  let reversed = props.post.reverse();
  console.log(reversed);
  return (
    <div>
      <Table striped bordered hover variant="dark">
        {console.log(props)}

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
          {props.post.map((val, index) => (
            <tr>
              <td>{index}</td>
              <td>{val.nameVal}</td>
              <td>{val.gender}</td>
              <td>{val.college}</td>
              <td>{val.date.toJSON().slice(0, 10).replace(/-/g, "/")}</td>
              <td>hhh</td>
              <td>
                {" "}
                <Button variant="danger">Delete</Button>{" "}
                <Button variant="info">Edit</Button>
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

export default connect(mapStateToProps)(Main);
