import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'

class BookCase extends Component {
  
  state= {
    currentlyRead: [],
    wantToRead: [],
    read: []
  }

  render() {
    return(
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf />
            </div>
           </div>
             <div className="open-search">
              <Link to='/search'>Add a book</Link>
             </div>
        </div>
      </div>
    );
  }
}

export default BookCase