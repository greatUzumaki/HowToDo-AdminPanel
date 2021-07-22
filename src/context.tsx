import { createContext } from 'react';
import { GetCategoryDto } from './api';

interface IContext {
  categories: GetCategoryDto[];
  setCategories: (category: GetCategoryDto[]) => void;
  setCategoryName: Function;
  categoryName: string;
}

export const Context = createContext<IContext | null>(null);
