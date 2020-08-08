import React from 'react';

const Search = (props) => {
    return (
        < form >
            <div className ="form-group">
                <input className="form-control" onChange={props.handleInputChange}/>
            </div>
        </form>
    )
}

export default Search
