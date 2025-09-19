import { create } from 'zustand';
import { addItem, updateItem, deleteItem, subscribeToItems } from '../firebase/itemsService';

export const useStore = create((set, get) => ({
  items: [],
  isLoading: true,
  error: null,
  
  // Initialize Firebase listener
  initializeItems: () => {
    const unsubscribe = subscribeToItems((items) => {
      set({ items, isLoading: false, error: null });
    });
    return unsubscribe;
  },

  addItem: async (item) => {
    try {
      const newItem = {
        name: item.name,
        category: item.category || 'Other',
        quantity: item.quantity || 1,
        unit: item.unit || 'pcs',
        checked: false,
        addedBy: item.addedBy || 'You',
        addedAt: new Date().toISOString(),
      };
      await addItem(newItem);
    } catch (error) {
      set({ error: 'Failed to add item' });
      console.error('Error adding item:', error);
    }
  },

  toggleItem: async (id) => {
    try {
      const item = get().items.find(item => item.id === id);
      if (item) {
        await updateItem(id, { checked: !item.checked });
      }
    } catch (error) {
      set({ error: 'Failed to toggle item' });
      console.error('Error toggling item:', error);
    }
  },

  removeItem: async (id) => {
    try {
      await deleteItem(id);
    } catch (error) {
      set({ error: 'Failed to remove item' });
      console.error('Error removing item:', error);
    }
  },

  updateItem: async (id, updates) => {
    try {
      await updateItem(id, updates);
    } catch (error) {
      set({ error: 'Failed to update item' });
      console.error('Error updating item:', error);
    }
  },

  clearCompleted: async () => {
    try {
      const completedItems = get().items.filter(item => item.checked);
      await Promise.all(
        completedItems.map(item => deleteItem(item.id))
      );
    } catch (error) {
      set({ error: 'Failed to clear completed items' });
      console.error('Error clearing completed items:', error);
    }
  },

  getItemsByCategory: () => {
    const items = get().items;
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  },

  clearError: () => set({ error: null }),
}));