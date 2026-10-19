import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './redux/CartSlice';

const money = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

export default function CartItem({ onContinue }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (items.length === 0) return <main className="page-container cart-page empty-cart">
    <div className="empty-cart-icon">🪴</div><h1>Tu carrito está esperando un poco de verde</h1>
    <p>Aún no has agregado plantas. Encuentra una que te encante.</p>
    <button className="primary-button" onClick={onContinue}>Continuar comprando</button>
  </main>;
  return <main className="page-container cart-page">
    <div className="section-heading"><p className="eyebrow">Tu selección</p><h1>Carrito de compras</h1>
      <p>{totalQuantity} {totalQuantity === 1 ? 'artículo' : 'artículos'} en tu carrito</p></div>
    <div className="cart-layout">
      <section className="cart-items-list" aria-label="Productos en el carrito">
        {items.map((item) => <article className="cart-row" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details"><h2>{item.name}</h2><p className="unit-price">Precio unitario: {money(item.price)}</p>
            <div className="quantity-controls">
              <button aria-label={`Disminuir cantidad de ${item.name}`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
              <span aria-live="polite">{item.quantity}</span>
              <button aria-label={`Aumentar cantidad de ${item.name}`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
            </div>
            <button className="text-button danger" onClick={() => dispatch(removeItem(item.id))}>Eliminar</button>
          </div>
          <div className="line-total"><span>Subtotal</span><strong>{money(item.price * item.quantity)}</strong></div>
        </article>)}
      </section>
      <aside className="order-summary"><h2>Resumen del pedido</h2>
        <div className="summary-line"><span>Artículos</span><span>{totalQuantity}</span></div>
        <div className="summary-line"><span>Envío</span><span>Se calcula después</span></div>
        <div className="summary-total"><span>Total</span><strong>{money(totalPrice)}</strong></div>
        <button className="primary-button checkout-button" onClick={() => setCheckoutMessage('¡Próximamente! El pago estará disponible muy pronto.')}>Proceder al pago</button>
        {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
        <button className="secondary-button" onClick={onContinue}>Continuar comprando</button>
      </aside>
    </div>
  </main>;
}
