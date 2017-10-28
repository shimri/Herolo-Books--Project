import React from 'react';
import BooksListPage from './BooksListPage';
import AddBook from '../utils/AddBook';
import { connect } from 'react-redux';
import { fetchBooks,deleteBook } from '../../actions';
import PropTypes from 'prop-types';
import DeleteMessage from '../messages/DeleteMessage';

class HomePage extends React.Component {

  componentDidMount() {
    if (this.props.books.length === 0) {
      this.props.fetchBooks();
    }
  }

  render() {

    return (
      <div>
        <h1>Books List</h1>
        <AddBook/>
        <DeleteMessage/>
        <BooksListPage books={this.props.books} deleteBook={this.props.deleteBook}/>
      </div>
    );
  }
}

HomePage.propTypes = {
  books: PropTypes.array.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    books: state.books
  }
}

export default connect(mapStateToProps, { fetchBooks,deleteBook })(HomePage);
