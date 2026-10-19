import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './redux/CartSlice';
import { plants } from './data/plants';

const money = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const categories = [...new Set(plants.map((plant) => plant.category))];
  return (
    <main className="page-container products-page">
      <div className="section-heading">
        <p className="eyebrow">Hechas para vivir en casa</p>
        <h1>Encuentra tu planta ideal</h1>
        <p>Explora nuestra colección y dale un toque natural a tus espacios.</p>
      </div>
      {categories.map((category) => <section className="plant-category" key={category}>
        <h2>{category}</h2>
        <div className="product-grid">
          {plants.filter((plant) => plant.category === category).map((plant) => {
            const added = cartItems.some((item) => item.id === plant.id);
            return <article className="product-card" key={plant.id}>
              <img src={plant.image} alt={plant.name} loading="lazy" />
              <div className="product-card-body">
                <h3>{plant.name}</h3><p className="product-description">{plant.description}</p>
                <div className="product-card-bottom"><strong>{money(plant.price)}</strong>
                  <button className="primary-button small-button" disabled={added} onClick={() => dispatch(addItem(plant))}>{added ? 'Agregado ✓' : 'Agregar al Carrito'}</button>
                </div>
              </div>
            </article>;
          })}
        </div>
      </section>)}
    </main>
  );
}
