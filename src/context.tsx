import { createContext } from 'react';
import { GetCategoryDto } from './api';

interface IContext {
  categories: GetCategoryDto[];
  setCategories: (category: GetCategoryDto[]) => void;
  setCategoryName: Function;
  categoryName: string;
  setHandler: (val: (old: number) => number) => void;
}

export const Context = createContext<IContext | null>(null);
