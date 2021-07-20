import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/' exact component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
