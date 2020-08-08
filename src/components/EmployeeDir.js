import React, { Component } from 'react';
import axios from "axios";

class EmployeeDir extends Component {
  state = {

  }

  componentDidMount() {
    this.loadData()
  }
  loadData = () => {
    axios.get("https://randomuser.me/api/?results=25").then((result) => {
      console.log(result.data.results[0].name)
    })
  }

  render() {
    return (
      <>
        <h1>Employee Directory</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Photo</th> 
              <th scope="col">Name</th>
              <th scope="col">Last</th> 
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>

            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

export default EmployeeDir