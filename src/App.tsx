import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CategoryApi, Configuration, GetCategoryDto } from './api';
import './App.css';
import Sidebar from './components/Sidebar';
import ScrollButton from './components/ToTopButton';
import { Context } from './context';
import AllCategory from './pages/AllCategory';
import Category from './pages/Category';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Request from './pages/Request';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState<GetCategoryDto[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

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
    <Context.Provider
      value={{ categories, setCategories, categoryName, setCategoryName }}
    >
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/category' exact component={AllCategory} />
          <Route path='/' exact component={LoginPage} />
          <Route path='/category/:name' component={Category} />
          <Route path='/request/:id' component={Request} />
        </Switch>
        <ScrollButton />
      </Router>
    </Context.Provider>
  );
}

export default App;
