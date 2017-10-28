import { DELETED, CLOSE_DLETED_MESSAGE } from '../actions';

export default function messages(state = false, action = {}) {
  switch(action.type) {
    case DELETED:
      return action.message
    case CLOSE_DLETED_MESSAGE:
      return action.message
    default: return state;
  }
}
