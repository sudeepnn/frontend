// src/App.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { Item } from './types';
import { getItems, addItem } from './api';




const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState<string>('');

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const items = await getItems();
      setItems(items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAddItem = async (event: FormEvent) => {
    event.preventDefault();
    if (!newItemName) return;

    try {
      const newItem = await addItem(newItemName);
      setItems([...items, newItem]);
      setNewItemName(''); // Reset input field
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Items List</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <form onSubmit={handleAddItem}>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add new item"
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default App;
