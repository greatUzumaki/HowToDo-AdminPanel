import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import ScrollButton from './components/ToTopButton';
import Category from './pages/Category';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/category' exact component={Category} />
        <Route path='/' exact component={LoginPage} />
        <Route path='/category/:name' />
        <Route path='/category/:name/:id' />
      </Switch>
      <ScrollButton />
    </Router>
  );
}

export default App;
