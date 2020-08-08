import React from 'react';

const Search = (props) => {
    return (
        < form >
            <div className ="form-group">
                <input className="form-control" onChange={props.handleInputChange} placeholder="Search by first or last name"/>
            </div>
        </form>
    )
}

export default Search
