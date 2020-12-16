import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import LibraryPage from './components/LibraryPage/LibraryPageContainer';
import AuthPage from './components/AuthPage/AuthPageContainer';
import BookPage from './components/BookPage/BookPageContainer';
import Header from './components/Headerr/HeaderContainer';

function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <Redirect to={"/library"} />} />
        <Route path="/auth" render={() => <AuthPage />} />
        <Route path="/book/:ISBN?" render={() => <BookPage />} />
        <Route path="/library" render={() => <LibraryPage />} />
        <Route path="*" render={() => {
          return (
            <div className="container alert alert-danger not-found">
              404 PAGE NOT FOUND
            </div>
          )
        }} />
      </Switch>
    </main>
  );
}

export default App;
