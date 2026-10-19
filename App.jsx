import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

function Navigation({ page, setPage }) {
  const items = useSelector((state) => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="navbar">
      <button className="brand-button" onClick={() => setPage('home')} aria-label="Ir al inicio">
        <span className="brand-leaf">✿</span><span>Paradise Nursery</span>
      </button>
      <nav>
        <button className={page === 'home' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('home')}>Inicio</button>
        <button className={page === 'plants' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('plants')}>Plantas</button>
        <button className={page === 'cart' ? 'nav-link active cart-nav' : 'nav-link cart-nav'} onClick={() => setPage('cart')}>🛒 Carrito <span className="cart-count">{count}</span></button>
      </nav>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <main className="hero">
      <div className="hero-overlay"><div className="hero-content">
        <p className="eyebrow light">Encuentra tu rincón verde</p>
        <h1>Paradise Nursery</h1>
        <p className="hero-copy">Plantas que llenan tu hogar de vida, calma y belleza.</p>
        <button className="primary-button" onClick={() => setPage('plants')}>Comenzar <span aria-hidden="true">→</span></button>
      </div></div>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  return (
    <div className="app-shell">
      <Navigation page={page} setPage={setPage} />
      {page === 'home' && <><Home setPage={setPage} /><AboutUs /></>}
      {page === 'plants' && <ProductList />}
      {page === 'cart' && <CartItem onContinue={() => setPage('plants')} />}
      <footer className="footer">Paradise Nursery <span>·</span> Cultiva tu pequeño paraíso.</footer>
    </div>
  );
}
