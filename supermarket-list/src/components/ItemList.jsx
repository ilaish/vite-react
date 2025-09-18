import { ShoppingCart, Trash2, Filter } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import ItemCard from './ItemCard';

const ItemList = () => {
  const { items, clearCompleted, getItemsByCategory } = useStore();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('category');

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Meat & Seafood',
    'Bakery',
    'Pantry',
    'Beverages',
    'Snacks',
    'Frozen',
    'Health & Beauty',
    'Household',
    'Other'
  ];

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !item.checked;
    if (filter === 'completed') return item.checked;
    return item.category === filter;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'added') {
      return new Date(b.addedAt) - new Date(a.addedAt);
    }
    return 0;
  });

  const groupedItems = sortBy === 'category' 
    ? getItemsByCategory()
    : { 'All Items': sortedItems };

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  return (
    <div className="item-list">
      <div className="list-header">
        <div className="list-title">
          <ShoppingCart size={24} />
          <h2>Shopping List</h2>
          <span className="item-count">
            {completedCount}/{totalCount} completed
          </span>
        </div>

        {completedCount > 0 && (
          <button
            onClick={clearCompleted}
            className="clear-completed-btn"
            aria-label="Clear completed items"
          >
            <Trash2 size={16} />
            Clear Completed
          </button>
        )}
      </div>

      <div className="filters">
        <div className="filter-group">
          <Filter size={16} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Items</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="category">Sort by Category</option>
            <option value="name">Sort by Name</option>
            <option value="added">Sort by Added Date</option>
          </select>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <ShoppingCart size={48} />
          <h3>Your shopping list is empty</h3>
          <p>Add your first item to get started!</p>
        </div>
      ) : (
        <div className="items-container">
          {sortBy === 'category' ? (
            Object.entries(groupedItems)
              .filter(([category, items]) => items.length > 0)
              .map(([category, categoryItems]) => (
                <div key={category} className="category-section">
                  <h3 className="category-title">
                    {category} ({categoryItems.length})
                  </h3>
                  <div className="category-items">
                    {categoryItems
                      .filter(item => {
                        if (filter === 'all') return true;
                        if (filter === 'pending') return !item.checked;
                        if (filter === 'completed') return item.checked;
                        return item.category === filter;
                      })
                      .map(item => (
                        <ItemCard key={item.id} item={item} />
                      ))}
                  </div>
                </div>
              ))
          ) : (
            <div className="all-items">
              {sortedItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemList;