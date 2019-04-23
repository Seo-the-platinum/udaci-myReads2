import React, { Component } from 'react'
import Shelf from './Shelf.js'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'

class BookCase extends Component {

  state= {
    bookCase: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
/*we need to fetch the books from the client using BooksAPI.getAll when the component is mounted.
  Once we have all the books, we set our bookCase state to hold the array of books as its value.
  then we create consts that will pass the bookCase array through a filter that pulls out the books that match
  the given shelf name.
*/
componentDidMount() {
  BooksAPI.getAll()
  .then(data=> this.setState(currState=> ({ bookCase: data})))
  .then(()=> (this.sortBooks()
     )
   )
}

/*update books takes 3 arguments, a book obj, a shelf value from the select element in the book component, and 
the return data from the update promise. we declare newBooks and set its value to the returned array from the map method
we passed our bookCase array through. 
*/
updateBooks= (book, newShelf, allShelves)=> {
  console.log(book, newShelf)
  const newBooks= this.state.bookCase.map(nBook=> {
    const foundId= allShelves[newShelf].find(bookId=> (bookId===nBook.id))
   if (foundId) {
       nBook.shelf=newShelf
   }
    return nBook
    })
  this.addBooks(newBooks)
}

addBooks= (books)=> {
  this.setState(currState=> {
    bookCase: books
  })
  this.sortBooks()
}

sortBooks= ()=> {
  const { bookCase }= this.state
       const cR= bookCase.filter(book=> (
         book.shelf==='currentlyReading'
       ))
       const wR= bookCase.filter(book=> (
         book.shelf==='wantToRead'
       ))
       const r= bookCase.filter(book=> (
         book.shelf==='read'
       ))
       this.setState(currState=> ({
         currentlyReading: cR,
         wantToRead: wR,
         read: r
       }))
}
  
  render() {
    const { currentlyReading, wantToRead, read }= this.state
    
     return(
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf shelf='Currently Reading' books={currentlyReading} updateBooks={this.updateBooks}/>
              <Shelf shelf='Want to Read' books={wantToRead} updateBooks={this.updateBooks}/>
              <Shelf shelf='Read' books={read} updateBooks={this.updateBooks}/>
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