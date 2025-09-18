import { Check, X, Edit3, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';

const ItemCard = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editUnit, setEditUnit] = useState(item.unit);
  
  const { toggleItem, removeItem, updateItem } = useStore();

  const handleSave = () => {
    if (editName.trim()) {
      updateItem(item.id, {
        name: editName.trim(),
        quantity: editQuantity,
        unit: editUnit,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditUnit(item.unit);
    setIsEditing(false);
  };

  return (
    <div className={`item-card ${item.checked ? 'checked' : ''}`}>
      <div className="item-main">
        <button
          className="check-button"
          onClick={() => toggleItem(item.id)}
          aria-label={item.checked ? 'Uncheck item' : 'Check item'}
        >
          <Check className={`check-icon ${item.checked ? 'checked' : ''}`} />
        </button>

        <div className="item-content">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="edit-input"
                autoFocus
              />
              <div className="quantity-edit">
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(parseInt(e.target.value) || 1)}
                  className="quantity-input"
                  min="1"
                />
                <select
                  value={editUnit}
                  onChange={(e) => setEditUnit(e.target.value)}
                  className="unit-select"
                >
                  <option value="pcs">pcs</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="l">l</option>
                  <option value="ml">ml</option>
                  <option value="pack">pack</option>
                  <option value="box">box</option>
                </select>
              </div>
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  <Check size={16} />
                </button>
                <button onClick={handleCancel} className="cancel-btn">
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="item-name">{item.name}</div>
              <div className="item-details">
                <span className="quantity">{item.quantity} {item.unit}</span>
                <span className="added-by">by {item.addedBy}</span>
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="item-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-button"
              aria-label="Edit item"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => removeItem(item.id)}
              className="delete-button"
              aria-label="Delete item"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;