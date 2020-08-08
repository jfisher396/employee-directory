import React, { Component } from 'react';
import axios from "axios";

class EmployeeDir extends Component {
  state = {
    employees: [],
  }

  componentDidMount() {
    this.loadData()
  }
  loadData = () => {
    axios.get("https://randomuser.me/api/?results=25").then((result) => {
      console.log(result.data.results)
      this.setState({ employees:[...result.data.results] })

    
    })
  }

  render() {
    return (
      <>
        <h1>Employee Directory</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee, index) => {
              return (
              <tr key={employee.email}>
                <th scope="row">{index+1}</th> 
                <td><img src={employee.picture.medium} alt={employee.name.first} /></td> 
                <td>{employee.name.first} {employee.name.last}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default EmployeeDir