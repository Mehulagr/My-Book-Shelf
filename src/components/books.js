import React, {Component} from 'react';
import emptyCover from '../images/empty.jpg';
import ManageShelf from './manageShelf';
import PropTypes from 'prop-types';

class Books extends Component {
    static propTypes = {
        bookDetail: PropTypes.object.isRequired,
        changingShelf: PropTypes.func.isRequired,
    }

    render () {
        const { bookDetail, changingShelf, myLibrary } = this.props;

        const bookThumbnail = bookDetail.imageLinks.thumbnail ? bookDetail.imageLinks.thumbnail : emptyCover;
        const bookTitle = bookDetail.title ? bookDetail.title : 'No title available';
        const bookAuthors = bookDetail.authors ? bookDetail.authors.join(', ') : 'Unknown authors';

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url( ${bookThumbnail} )` }}></div>
                        <ManageShelf myLibrary={myLibrary} bookDetail={bookDetail} changingShelf={changingShelf}/>
                    </div>
                    <div className="book-title">{bookTitle}</div>
                    <div className="book-authors">{bookAuthors}</div>
                </div>
            </li>
        )
    }
}

export default Books;