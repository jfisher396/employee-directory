import React, { Component } from 'react';
import axios from "axios";
import Search from "./Search";

//Creates the employee table component
class EmployeeDir extends Component {
  state = {
    employees: [],
    searchTerm: null,
    filteredArr: [],
    sortType: "asc",
  };
  //Loads the data upon pageload
  componentDidMount() {
    this.loadData();
  }

  //Makes the connection to the API server to retrieve 25 random results
  loadData = () => {
    axios.get("https://randomuser.me/api/?nat=us&results=25").then((result) => {
      // console.log(result.data.results)
      this.setState({
        employees: [...result.data.results],
        filteredArr: [...result.data.results],
      });
    });
  };

  //Takes the input from the form and searches by first and last name based on letters entered
  handleInputChange = (event) => {
    const value = event.target.value;
    let searchResults = this.state.employees.filter((user) => user.name.last.toLowerCase().includes(value) || user.name.first.toLowerCase().includes(value));
    
    this.setState({
      searchTerm: value,
      filteredArr: [...searchResults],
    });
  };
  //An event handler to sort employees by last name in alternating ascending and descending order.
  handleClickEvent = () => {
    let ascSort = [...this.state.filteredArr].sort((a, b) => {
      if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
        return -1;
      }
      if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    let descSort = [...this.state.filteredArr].sort((a, b) => {
      if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) {
        return -1;
      }
      if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    //changes the name of the sortType from asc to desc and vice versa, and based on that type will reassign the filtered array
    if (this.state.sortType === "asc") {
      this.setState({ sortType: "desc", filteredArr: descSort }); //if the sortType is asc, turn it to desc and assign descSort to filtered array
    } else {
      this.setState({ sortType: "asc", filteredArr: ascSort }); //vice versa
    }
  };

  //Takes the information from the API and renders it onto the page in table form.
  render() {
    return (
      <>
        <div className="container">
          <h1>Employee Directory</h1>
          <Search
            searchTerm={this.state.searchTerm}
            handleInputChange={this.handleInputChange}
          />
          <div className="table-responsive">
            <table className="table table-striped table-borderless">
              <caption>List of employees</caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th
                    onClick={() => {
                      this.handleClickEvent();
                    }}
                    scope="col"
                    className={`${
                      this.state.sortType === "asc" ? "stylesAsc" : "stylesDesc"
                    } hover`}
                  >
                    Name
                  </th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody >
                {this.state.filteredArr.map((employee, index) => {
                  return (
                    <tr key={employee.email}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          src={employee.picture.medium}
                          alt={employee.name.first}
                        />
                      </td>
                      <td>
                        {employee.name.first} {employee.name.last}
                      </td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default EmployeeDir