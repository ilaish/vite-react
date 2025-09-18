# 🛒 Supermarket List App

A modern React shopping list application built with Vite, Zustand for state management, and Lucide React for icons.

## ✨ Features

- ➕ Add new items to your shopping list
- ✅ Mark items as completed
- 🗑️ Delete items from the list
- 💾 Persistent state management with Zustand
- 📱 Responsive design
- 🎨 Modern UI with clean design

## 🚀 Live Demo

[View Live App on Vercel](https://your-app-name.vercel.app)

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **Lucide React** - Icon library
- **CSS3** - Styling

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/supermarket-list-app.git
cd supermarket-list-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AddItem.jsx      # Add new items component
│   ├── ItemCard.jsx     # Individual item display
│   └── ItemList.jsx     # List of all items
├── store/
│   └── useStore.js      # Zustand store
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

## 🎯 Usage

1. **Add Items**: Type in the input field and press Enter or click the add button
2. **Complete Items**: Click the checkbox next to any item to mark it as done
3. **Delete Items**: Click the trash icon to remove items from the list

## 🚀 Deployment

This app is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite React app
3. Deploy with zero configuration!

## 📝 License

MIT License - feel free to use this project for learning and development.

---

Made with ❤️ using React and Vite