import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import Overview from './pages/Overview';

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/overview' exact component={Overview} />
        <Route path='/login' exact component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
