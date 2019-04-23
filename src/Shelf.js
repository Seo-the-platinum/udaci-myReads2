import React, { Component } from 'react'
import Book from './Book.js'

class Shelf extends Component {
  
  
  render() {
    const { books, shelf }= this.props
    const { updateBooks }= this.props
    return(
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                 {books.map(book=> (
                    <Book key={book.id} book={book} image={book.imageLinks.thumbnail} updateBooks={updateBooks}/>
                  ))}
                    </ol>
                  </div>
                </div>
      </div>
    );
  }
}

export default Shelf