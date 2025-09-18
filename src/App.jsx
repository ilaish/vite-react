import { ShoppingCart } from 'lucide-react';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <ShoppingCart size={28} />
          <h1>Supermarket List</h1>
        </div>
        <p className="app-subtitle">Shared shopping list for your family</p>
      </header>

      <main className="app-main">
        <ItemList />
        <AddItem />
      </main>

      <footer className="app-footer">
        <p>Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
