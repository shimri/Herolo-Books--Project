import React from 'react';
import BookCard from './BookCard';
import PropTypes from 'prop-types';

export default function BooksListPage({ books, deleteBook }) {
  const emptyMessage = (
    <p>There are no books yet in your collection.</p>
  );

  const booksList = (
    <div className="ui four cards">
      { books.map(book => <BookCard deleteBook={deleteBook} book={book} key={book.book_id} />) }
    </div>
  );

  return (
    <div>
      {books.length === 0 ? emptyMessage : booksList}
    </div>
  );
}

BooksListPage.propTypes = {
  books: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired
}
