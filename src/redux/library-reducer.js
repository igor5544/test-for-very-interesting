import { libraryAPI } from '../firebase/firebase';
import { stopSubmit } from 'redux-form';

const SET_BOOKS = 'SET_BOOKS';
const SET_ACTIVE_BOOK = 'ET_ACTIVE_BOOK';
const SET_ACTIVE_BOOK_ID = 'SET_ACTIVE_BOOK_ID';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_DELETING_PROGRESS = 'TOGGLE_IS_DELETING_PROGRESS';
const TOGGLE_IS_SENDING = 'TOGGLE_IS_SENDING';
const TOGGLE_SUCCESS_SEND = 'TOGGLE_SUCCESS_SEND';

const initialState = {
  books: [],
  isFetching: true,
  deletingInProgress: [],
  activeBook: {},
  activeBookId: null,
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
    case SET_ACTIVE_BOOK_ID:
      return ({
        ...state,
        activeBookId: action.id,
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
          [...state.deletingInProgress, action.id] :
          [...state.deletingInProgress.filter(id => id !== action.id)]
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

export const setActiveBook = (bookInfo) => {
  return {
    type: SET_ACTIVE_BOOK,
    bookInfo
  }
}

export const setActiveBookId = (id) => {
  return {
    type: SET_ACTIVE_BOOK_ID,
    id
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

export const toggleIsDeletingProgress = (isFetching, id) => {
  return {
    type: TOGGLE_IS_DELETING_PROGRESS,
    isFetching,
    id
  }
}

export const toggleSubscribeBooks = () => async dispatch => {
  await libraryAPI.subscribeBooks().onSnapshot(response => {
    dispatch(toggleIsFetching(true));
    dispatch(setBooks(response));
    dispatch(toggleIsFetching(false));
  })

}

export const setBook = (title, authors, date, ISBN, id) => async dispatch => {
  const response = await libraryAPI.setBook(title, authors, date, ISBN, id)

  if (response) {
    dispatch(toggleSuccessSend(true));
    dispatch(toggleSuccessSend(false));
  };
}

export const updateBookInfo = (title, authors, date, ISBN, id) => async dispatch => {
  dispatch(toggleIsSending(true));
  const response = await libraryAPI.getBook(ISBN);

  response.forEach(book => {
    if (ISBN === book.data().ISBN && id !== book.id) {
      dispatch(stopSubmit('book', { _error: 'this ISBN is already taken' }));
    } else {
      dispatch(setBook(title, authors, date, ISBN, id));
      dispatch(setActiveBook(null));
    }
  })

  if (response.size === 0) {
    dispatch(setBook(title, authors, date, ISBN, id));
    dispatch(setActiveBook(null));
  }

  dispatch(toggleIsSending(false));
}

export const addNewBook = (title, authors, date, ISBN) => async dispatch => {
  dispatch(toggleIsSending(true));
  const response = await libraryAPI.getBook(ISBN);

  if (response.size > 0) {
    dispatch(stopSubmit('book', { _error: 'this ISBN is already taken' }));
  } else {
    dispatch(setBook(title, authors, date, ISBN));
  }

  dispatch(toggleIsSending(false));
}

export const deleteBook = (id) => async dispatch => {
  dispatch(toggleIsDeletingProgress(true, id));

  await libraryAPI.deleteBook(id);

  dispatch(toggleIsDeletingProgress(false, id));
}

export const getBookInfo = (ISBN) => async dispatch => {
  dispatch(toggleIsFetching(true));

  if (!ISBN) {
    dispatch(setActiveBook(null));
  } else {
    const response = await libraryAPI.getBook(ISBN);

    response.forEach(book => {
      dispatch(setActiveBookId(book.id));
      dispatch(setActiveBook(book.data()));
    })
  }

  setTimeout(() => {
    dispatch(toggleIsFetching(false));
  }, 0);
}

export default libraryReducer;