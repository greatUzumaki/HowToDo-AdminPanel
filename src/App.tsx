import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CategoryApi, Configuration, GetCategoryDto } from './api';
import './App.css';
import Sidebar from './components/Sidebar';
import ScrollButton from './components/ToTopButton';
import { Context } from './context';
import Category from './pages/Category';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<GetCategoryDto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const API = new CategoryApi(new Configuration({ basePath: '/api' }));
      try {
        const getCategories = (await API.getAllCategory()).data;
        setCategories(getCategories);
      } catch {
        enqueueSnackbar('Проблемы с получением категорий', {
          variant: 'error',
        });
      }
    };
    fetch();
  }, [enqueueSnackbar]);

  return (
    <Context.Provider value={{ categories, setCategories }}>
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
    </Context.Provider>
  );
}

export default App;
