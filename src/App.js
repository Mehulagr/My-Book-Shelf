import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchPage from './components/search';
import Shelf from './components/shelf';
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    myLibrary: []
  }

  componentDidMount () {
    BooksAPI.getAll()
      .then((myLibrary) => {
        this.setState(() => ({
          myLibrary
        }))
      })
  }

  onChangingShelf = (newShelf, bookDetails) => {
    //Case 1: Book exists in library and we are changing shelf to something other than none
    //Case 2: Book exist in library and we are changing shelf to none
    //Case 3: Book does not exist in library and we are adding
    BooksAPI.update(bookDetails, newShelf)
      .then((updatedBookResult) => {
        console.log(updatedBookResult)
      })

    let bookInLibrary = this.state.myLibrary.find((findingBook) => findingBook.id === bookDetails.id);    

    if (bookInLibrary) {
      if (newShelf === "none" ) {
        this.setState((currentState) => ({
          myLibrary: currentState.myLibrary.filter(i => i.id !== bookDetails.id)
        }))
      } else {
        this.setState((currentState) => (
          currentState.myLibrary.find((y) => y.id === bookDetails.id).shelf = newShelf
        ))
      }
    } else {
      bookDetails.shelf = newShelf;
      this.setState((currentState) => ({
        myLibrary: [...currentState.myLibrary, bookDetails]
      }))
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf 
            myLibrary={this.state.myLibrary} 
            changingShelf={(newShelf, bookDetails) => (this.onChangingShelf(newShelf, bookDetails))}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchPage 
            myLibrary={this.state.myLibrary} 
            changingShelf={(newShelf, bookDetails) => (this.onChangingShelf(newShelf, bookDetails))}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
