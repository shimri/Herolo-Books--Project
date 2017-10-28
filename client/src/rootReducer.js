import {combineReducers} from 'redux';
import books from './reducers/books';
import messages from './reducers/message';

export default combineReducers({
  books,
  messages
})
