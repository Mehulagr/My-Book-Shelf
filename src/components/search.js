import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import {Link} from 'react-router-dom';
import Books from './books';
import PropTypes from 'prop-types';

class SearchPage extends Component {
    state= {
        query: "",
        searchResultList: []
    }

    static propTypes = {
        myLibrary: PropTypes.array.isRequired,
        changingShelf: PropTypes.func.isRequired,
    }

    handleSearch = (query) => {
        this.setState(() => ({
            query: query
        }));
        
        if (query === "") {
            this.setState(() => ({
                searchResultList: []
            }))
        } else {
            BooksAPI.search(query)
                .then((searchResultList) => {
                    if (searchResultList && searchResultList.error !== "empty query") {
                        this.setState(() => ({
                            searchResultList
                        }))
                    } else {
                        this.setState(() => ({
                            searchResultList: []
                        }))
                    }
                })
        }
    }

    render () {
        const { searchResultList, query } = this.state;
        const { myLibrary, changingShelf } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.handleSearch(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResultList.map((thisBook) => <Books myLibrary={myLibrary} bookDetail={thisBook} changingShelf={changingShelf} key={thisBook.id}/> )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage;