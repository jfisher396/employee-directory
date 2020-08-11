import React, { Component } from 'react';
import axios from "axios";
import Search from "./Search";

//Creates the employee table component
class EmployeeDir extends Component {
  state = {
    employees: [],
    searchTerm: null,
    filteredArr: [],
    sortType: "asc"
  }
//Loads the data upon pageload
  componentDidMount() {
    this.loadData()
  }
  //Makes the connection to the API server to retrieve 25 random results
  loadData = () => {
    axios.get("https://randomuser.me/api/?nat=us&results=25").then((result) => {
      // console.log(result.data.results)
      this.setState({
        employees: [...result.data.results],
        filteredArr: [...result.data.results]
      })

    })
  }
//Takes the input from the form and searches by first and last name based on letters entered
  handleInputChange = event => {
    const value = event.target.value;
    let found = this.state.employees.filter(user => user.name.last.toLowerCase().includes(value) || user.name.first.toLowerCase().includes(value))
    this.setState({
      searchTerm:value,
      filteredArr: [...found]
    });
    
  };
//Takes the information from the API and renders it onto the page in table form.
  render() {

    return (
      <>
        <div className="container-fluid">
        <h1>Employee Directory</h1>
        <Search searchTerm={this.state.searchTerm} handleInputChange={this.handleInputChange} />
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
            {this.state.filteredArr.map((employee, index) => {
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
        </div>
      </>
    );
  }
}

export default EmployeeDir