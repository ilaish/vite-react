import { useEffect } from 'react';
import { ShoppingCart, Wifi, WifiOff } from 'lucide-react';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import { useStore } from './store/useStore';
import './App.css';

function App() {
  const { initializeItems, isLoading, error, clearError } = useStore();

  useEffect(() => {
    const unsubscribe = initializeItems();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [initializeItems]);

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <ShoppingCart size={48} className="loading-icon" />
          <h2>Loading your shopping list...</h2>
          <p>Connecting to the cloud</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <ShoppingCart size={28} />
          <h1>Supermarket List</h1>
          <div className="connection-status">
            <Wifi size={20} className="online-icon" />
            <span>Live</span>
          </div>
        </div>
        <p className="app-subtitle">Shared shopping list for your family</p>
        {error && (
          <div className="error-banner">
            <WifiOff size={16} />
            <span>{error}</span>
            <button onClick={clearError} className="error-close">×</button>
          </div>
        )}
      </header>

      <main className="app-main">
        <ItemList />
        <AddItem />
      </main>

      <footer className="app-footer">
        <p>Built with React, Vite & Firebase</p>
        <p className="sync-status">🔄 Real-time sync enabled</p>
      </footer>
    </div>
  );
}

export default App;
