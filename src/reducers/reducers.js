import { combineReducers } from "redux";

import { 
  SET_MOVIES, 
  SET_FILTER, 
  SET_USER, 
  UPDATE_USER 
} from "../actions/actions";

function visibilityFilter(state = '', action) {
  switch(action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function users(state = null, action) {
  switch(action.type) {
    case SET_USER:
      return action.value;

    case UPDATE_USER:
      return action.value;
      
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  users
});


export default moviesApp;
