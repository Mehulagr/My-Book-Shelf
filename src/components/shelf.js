import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Books from './books';
import PropTypes from 'prop-types';

const shelfTypes = [
  { type: 'currentlyReading', title: 'Currently Reading' },
  { type: 'wantToRead', title: 'Want to Read' },
  { type: 'read', title: 'Read' }
];

class Shelf extends Component {
    static propTypes = {
      myLibrary: PropTypes.array.isRequired,
      changingShelf: PropTypes.func.isRequired,
    }

    render () {
        //const {  } = this.state;
        const { myLibrary, changingShelf } = this.props;

        //console.log(myLibrary);

        return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content"> {
              shelfTypes.map((shelf) => (
                <div className="bookshelf" key={shelf.type}>
                  <h2 className="bookshelf-title">{shelf.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {myLibrary.filter(booksOnShelf => booksOnShelf.shelf === shelf.type).map((thisBook) => <Books bookDetail={thisBook} changingShelf={changingShelf} key={thisBook.id}/> )}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
    }
}

export default Shelf;