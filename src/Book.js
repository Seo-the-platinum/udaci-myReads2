import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI.js'


class Book extends Component {
  state= {
    value: '',
    option: ''
  }
  

  handleChange= (e)=> {
    console.log(e.target.value)
    const shelf= e.target.value
    const { book }= this.props
//    const { id }= this.props.book
    
    BooksAPI.update(book, shelf)
    .then(data=> this.props.updateBooks(book, shelf, data))
 }

  render() {
    const { book, image }= this.props
    return(
      <div>
         <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 192, backgroundImage:`url(${image})`}}></div>
                <div className="book-shelf-changer">
                  <select onChange={this.handleChange } value={book.shelf || "none"}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
            </div>
        </li>
      </div>
    );
  }
}

export default Book