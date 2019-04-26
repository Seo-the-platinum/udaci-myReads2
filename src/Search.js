import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'

class Search extends Component {
  
   state= {
    bookCase: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    query: '',
    searchedBooks: []
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
handleChange= (e)=> {
  console.log(e)
 
 this.setState((currState)=> ({query: e.trim()}), ()=>{this.search(e)})
  let { query }= this.state
  
}

search= (query)=> {
  if(query==='' || query=== undefined){
    this.setState(currState=> ({
      searchedBooks: [],
    }))}
   BooksAPI.search(query).then(data=> {
    
    data.forEach(b=> { 
      let m= this.state.bookCase.filter(B=> B.id === b.id)
      if(m[0]) {
        b.shelf=m[0].shelf
      } return this.setState(currState=> ({searchedBooks: data}))
      })
  })
  .catch(error=> {console.log(error)
       this.setState(currState=> ({ searchedBooks: [] }))
        })
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
  this.setState(currState=> ({
   bookCase: books
  }))
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
    const { query, searchedBooks, bookCase}= this.state
    return(
      <div>
         <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={(e)=>this.handleChange(e.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchedBooks.map(book=> (
            <Book bookCase={bookCase} key={book.id} updateBooks={this.updateBooks} book={book} image={book.imageLinks ? (book.imageLinks.thumbnail): (`http://via.placeholder.com/128x193?text=?`)}/>))}
              </ol>
            </div>
          </div>
      </div>
    );
  }
}

export default Search