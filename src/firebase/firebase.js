import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyCJryPWbbHUEDUYCpFmIMk4biYmGW9cGwI",
  authDomain: "test-task-very-interesting.firebaseapp.com",
  projectId: "test-task-very-interesting",
  storageBucket: "test-task-very-interesting.appspot.com",
  messagingSenderId: "669971670276",
  appId: "1:669971670276:web:ae501f1e510489b9679c51"
});

const db = firebase.firestore();

export const authAPI = {
  getUser(email) {
    return db.collection("users").doc(email.toLowerCase()).get().then(response =>
      response
    )
  },
  setUser(email, password) {
    return db.collection("users").doc(email.toLowerCase()).set({ email, password }).then(() =>
      true
    )
  }
}

export const libraryAPI = {
  getBook(ISBN) {
    return db.collection("books").where("ISBN", "==", ISBN).get().then(response =>
      response
    )
  },
  setBook(title, authors, date, ISBN, id) {
    return db.collection("books").doc(id).set({ title, authors, date, ISBN }).then(() =>
      true
    )
  },
  subscribeBooks() {
    return db.collection("books")
  },
  deleteBook(id) {
    return db.collection("books").doc(id).delete().then(() =>
      true
    )
  }
}