import { libraryAPI } from '../firebase/firebase';
import { stopSubmit } from 'redux-form';

const SET_BOOKS = 'SET_BOOKS';
const SET_ACTIVE_BOOK = 'ET_ACTIVE_BOOK';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_DELETING_PROGRESS = 'TOGGLE_IS_DELETING_PROGRESS';
const TOGGLE_IS_SENDING = 'TOGGLE_IS_SENDING';
const TOGGLE_SUCCESS_SEND = 'TOGGLE_SUCCESS_SEND';

const initialState = {
  books: [],
  isFetching: true,
  deletingInProgress: [],
  activeBook: {},
  isSending: false,
  successSend: false
};

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return ({
        ...state,
        books: action.books,
      })
    case SET_ACTIVE_BOOK:
      return ({
        ...state,
        activeBook: action.bookInfo,
      })
    case TOGGLE_IS_FETCHING:
      return ({
        ...state,
        isFetching: action.isFetching
      })
    case TOGGLE_IS_SENDING:
      return ({
        ...state,
        isSending: action.isSending
      })
    case TOGGLE_SUCCESS_SEND:
      return ({
        ...state,
        successSend: action.successSend
      })
    case TOGGLE_IS_DELETING_PROGRESS:
      return ({
        ...state,
        deletingInProgress: action.isFetching ?
          [...state.deletingInProgress, action.ISBN] :
          [...state.deletingInProgress.filter(ISBN => ISBN !== action.ISBN)]
      })
    default:
      return state;
  }
}

export const setBooks = (books) => {
  return {
    type: SET_BOOKS,
    books
  }
}

export const setActiveBooks = (bookInfo) => {
  return {
    type: SET_ACTIVE_BOOK,
    bookInfo
  }
}

export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching
  }
}

export const toggleIsSending = (isSending) => {
  return {
    type: TOGGLE_IS_SENDING,
    isSending
  }
}

export const toggleSuccessSend = (successSend) => {
  return {
    type: TOGGLE_SUCCESS_SEND,
    successSend
  }
}

export const toggleIsDeletingProgress = (isFetching, ISBN) => {
  return {
    type: TOGGLE_IS_DELETING_PROGRESS,
    isFetching,
    ISBN
  }
}

export const toggleSubscribeBooks = () => async dispatch => {
  await libraryAPI.subscribeBooks().onSnapshot(response => {
    dispatch(toggleIsFetching(true));
    dispatch(setBooks(response));
    dispatch(toggleIsFetching(false));
  })

}

export const setBook = (title, authors, date, ISBN, targetISMN = ISBN) => async dispatch => {
  dispatch(toggleIsSending(true));

  const response = await libraryAPI.setBook(title, authors, date, ISBN, targetISMN).catch(error => {
    dispatch(toggleIsSending(false));
    return dispatch(stopSubmit('book', { _error: error }));
  });

  if (response) {
    dispatch(toggleSuccessSend(true));
    dispatch(toggleSuccessSend(false));
  };

  dispatch(toggleIsSending(false));
}

export const addNewBook = (title, authors, date, ISBN) => async dispatch => {
  dispatch(toggleIsSending(true));
  const response = await libraryAPI.getBook(ISBN);

  if (response.exists) {
    dispatch(stopSubmit('book', { _error: 'this ISBN is already taken' }));
  }

  if (!response.exists) {
    dispatch(setBook(title, authors, date, ISBN));
  }
  dispatch(toggleIsSending(false));
}

export const deleteBook = (ISBN) => async dispatch => {
  dispatch(toggleIsDeletingProgress(true, ISBN));

  await libraryAPI.deleteBook(ISBN);

  dispatch(toggleIsDeletingProgress(false, ISBN));
}

export const getBookInfo = (ISBN) => async dispatch => {
  dispatch(toggleIsFetching(true));

  if (!ISBN) {
    dispatch(setActiveBooks(null));
  } else {
    const response = await libraryAPI.getBook(ISBN);

    dispatch(setActiveBooks(response.data()));
  }

  setTimeout(() => {
    dispatch(toggleIsFetching(false));
  }, 0);
}

export default libraryReducer;