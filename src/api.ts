// src/api.ts
import axios from 'axios';
import { Item } from './types';

const API_URL = 'http://localhost:5000/items';

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get<Item[]>(API_URL);
  return response.data;
};

export const addItem = async (name: string): Promise<Item> => {
  const response = await axios.post<Item>(API_URL, { name });
  return response.data;
};
