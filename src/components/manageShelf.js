import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ManageShelf extends Component {
    static propTypes = {
        bookDetail: PropTypes.object.isRequired,
        changingShelf: PropTypes.func.isRequired,
    }

    handleChange = (e) => {
        if (this.props.changingShelf) {
            this.props.changingShelf(e.target.value, this.props.bookDetail);
        }
    }

    bookShelf = () => {
        if (this.props.bookDetail.shelf) {
            return this.props.bookDetail.shelf
        } else if (this.props.myLibrary && this.props.myLibrary.find((selectedBook) => selectedBook.id === this.props.bookDetail.id)) {
            return this.props.myLibrary.find((selectedBook) => selectedBook.id === this.props.bookDetail.id).shelf
        } else {
            return "none"
        }
    }

    render () {
        
        return (
            <div className="book-shelf-changer">
                <select value={this.bookShelf()} onChange={this.handleChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default ManageShelf;