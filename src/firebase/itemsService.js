import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

const ITEMS_COLLECTION = 'items';

// Add a new item to Firestore
export const addItem = async (itemData) => {
  try {
    const docRef = await addDoc(collection(db, ITEMS_COLLECTION), {
      ...itemData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// Update an existing item
export const updateItem = async (itemId, updates) => {
  try {
    const itemRef = doc(db, ITEMS_COLLECTION, itemId);
    await updateDoc(itemRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

// Delete an item
export const deleteItem = async (itemId) => {
  try {
    const itemRef = doc(db, ITEMS_COLLECTION, itemId);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Subscribe to real-time updates
export const subscribeToItems = (callback) => {
  const q = query(collection(db, ITEMS_COLLECTION), orderBy('createdAt', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const items = [];
    snapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(items);
  }, (error) => {
    console.error('Error listening to items:', error);
  });
};