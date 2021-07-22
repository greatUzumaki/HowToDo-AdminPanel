import { createContext } from 'react';
import { GetCategoryDto } from './api';

interface IContext {
  categories: GetCategoryDto[];
  setCategories: (category: GetCategoryDto[]) => void;
}

export const Context = createContext<IContext | null>(null);
