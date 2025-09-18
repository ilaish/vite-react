import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const newItem = {
          id: Date.now().toString(),
          name: item.name,
          category: item.category || 'Other',
          quantity: item.quantity || 1,
          unit: item.unit || 'pcs',
          checked: false,
          addedBy: item.addedBy || 'You',
          addedAt: new Date().toISOString(),
        };
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },
      toggleItem: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        }));
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      clearCompleted: () => {
        set((state) => ({
          items: state.items.filter((item) => !item.checked),
        }));
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
    }),
    {
      name: 'supermarket-list-storage',
    }
  )
);