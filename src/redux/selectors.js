export const getIsAuth = (state) => {
  return state.auth.isAuth
}

export const gerIsSendingAuth = (state) => {
  return state.auth.isSending
}

export const getEmail = (state) => {
  return state.auth.email
}

export const getIsFetching = (state) => {
  return state.library.isFetching
}

export const getBooksList = (state) => {
  return state.library.books
}

export const getDeletingInProgress = (state) => {
  return state.library.deletingInProgress
}

export const getActiveBook = (state) => {
  return state.library.activeBook
}

export const getIsSendingBook = (state) => {
  return state.library.isSending
}

export const getSuccessSend = (state) => {
  return state.library.successSend
}

export const getInitialized = (state) => {
  return state.initial.initialized
}
