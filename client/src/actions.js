export const SET_BOOKS = 'SET_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const DELETED = 'DELETED';
export const CLOSE_DLETED_MESSAGE = 'CLOSE_DLETED_MESSAGE';


export function setBooks(books) {
  return {
    type: SET_BOOKS,
    books
  }
}

export function newBook(newbook) {
  return {
    type: ADD_BOOK,
    newbook
  }
}


export function activeMessage(message) {
  return {
    type: DELETED,
    message
  }
}

export function closeMessage(message) {
  return {
    type: CLOSE_DLETED_MESSAGE,
    message
  }
}

export function addBook(book) {
  return {
    type: EDIT_BOOK,
    book
  }
}

export function delteBook(id) {
  return {
    type: DELETE_BOOK,
    id
  }
}

export function editBook(data) {
  return dispatch => {
      dispatch(addBook(data));
  }
}

export function deleteMessage() {
  return dispatch => {
      dispatch(closeMessage(false));
  }
}
export function deleteBook(data) {
  return dispatch => {
      dispatch(activeMessage(true));
      dispatch(delteBook(data));
  }
}

export function saveBook(data) {
  return dispatch => {
    dispatch(newBook(data));
  }
}

export function fetchBooks() {
  return dispatch => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => dispatch(setBooks(data.books)))
      .catch(err =>  [])
  }
}
