import { SET_BOOKS, ADD_BOOK, EDIT_BOOK, DELETE_BOOK } from '../actions';
import _ from 'lodash'

export default function books(state = [], action = {}) {
  switch(action.type) {
    case ADD_BOOK:
      action.newbook.title = _.startCase(_.toLower(action.newbook.title));
      action.newbook.title.replace(/\W/g, '');
      return [
        ...state,
        action.newbook
      ];
    case SET_BOOKS:
    var books = []
     action.books.map(item => {
        item.title = _.startCase(_.toLower(item.title));
        item.title.replace(/\W/g, '');
        books.push(item);
      })
      return books;
    case EDIT_BOOK:
      return state.map(item => {
        if (item.book_id === action.book.book_id) return action.book;
        return item;
      });
    case DELETE_BOOK:
      return state.filter(item => item.book_id !== action.id)
    default: return state;
  }
}
