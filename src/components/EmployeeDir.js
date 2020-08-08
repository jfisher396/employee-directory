import React, { Component } from 'react';
import axios from "axios";

class EmployeeDir extends Component {
  state = {
    pictures: [],
  }

  componentDidMount() {
    this.loadData()
  }
  loadData = () => {
    axios.get("https://randomuser.me/api/?results=25").then((result) => {
      console.log(result.data.results[0].picture.medium)
    
    })
  }

  render() {
    return (
      <>
        <h1>Employee Directory</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope ="col">#</th>
              <th scope="col">Photo</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Placeholder</td>
              <td>Doug</td>
              <td>Jones</td>
              <td>doug@email.com</td>
              <td>(206) 123-4567</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default EmployeeDir