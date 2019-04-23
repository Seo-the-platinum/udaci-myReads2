import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import BookCase from './BookCase.js'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  //need to get all books and update state using BooksAPI.getAll when the component is mounted
  componentDidMount() {
    BooksAPI.getAll()
    .then(data=> {
      this.setState(currState=> ({
        books: data
      }))
    })
  }
  

  render() {
    const {books}= this.state
    return (
      <div className="app">
       <Route exact path='/search' render={ ()=> (<Search books={books}/>)}/>
       <Route exact path='/' render={()=> (<BookCase />)}/>
      </div>
    )
  }
}

export default BooksApp
