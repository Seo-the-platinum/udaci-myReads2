import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Search from './Search.js'
import BookCase from './BookCase.js'

class BooksApp extends React.Component {
  state = {
    books: []
  }
 

  render() {
    const {books}= this.state
    return (
      <div className="app">
      <Switch>
       <Route exact path='/search' render={ ()=> (<Search books={books}/>)}/>
       <Route exact path='/' render={()=> (<BookCase library={this.library}/>)}/>
      </Switch>
      </div>
    )
  }
}

export default BooksApp
