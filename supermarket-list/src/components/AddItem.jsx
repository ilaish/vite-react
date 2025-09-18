import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';

const AddItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Other');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('pcs');
  const [addedBy, setAddedBy] = useState('You');

  const { addItem } = useStore();

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

  const units = ['pcs', 'kg', 'g', 'l', 'ml', 'pack', 'box'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addItem({
        name: name.trim(),
        category,
        quantity,
        unit,
        addedBy,
      });
      setName('');
      setQuantity(1);
      setUnit('pcs');
      setCategory('Other');
      setAddedBy('You');
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setQuantity(1);
    setUnit('pcs');
    setCategory('Other');
    setAddedBy('You');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        className="add-item-button"
        onClick={() => setIsOpen(true)}
        aria-label="Add new item"
      >
        <Plus size={20} />
        <span>Add Item</span>
      </button>
    );
  }

  return (
    <div className="add-item-overlay">
      <div className="add-item-form">
        <div className="form-header">
          <h3>Add New Item</h3>
          <button
            onClick={handleCancel}
            className="close-button"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label htmlFor="item-name">Item Name</label>
            <input
              id="item-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter item name"
              className="form-input"
              autoFocus
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="form-select"
              >
                {units.map((unitOption) => (
                  <option key={unitOption} value={unitOption}>
                    {unitOption}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="added-by">Added By</label>
            <input
              id="added-by"
              type="text"
              value={addedBy}
              onChange={(e) => setAddedBy(e.target.value)}
              placeholder="Your name"
              className="form-input"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;