import React, { useState, useEffect } from 'react';
import { getStar } from '../utils/helperFunctions';

const Checkout = () => {
  const test = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
    { id: 4, name: 'Product 4', price: 40 }
  ];

  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems)
  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    if (cartItemsFromStorage) {
      setCartItems(JSON.parse(cartItemsFromStorage));
    }
  }, []);


  const handleDecrement = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 0) - 1, 0)
    }));
  };

  const handleIncrement = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1
    }));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const { id, price } = item;
    const quantity = quantities[id] || 0;
    return acc + price * quantity;
  }, 0);

  const tax = 0; // Replace with your tax calculation logic
  const total = subtotal + tax;
  return (
    <div className='main-div d-flex flex-column gap-4'>
         <div className='d-flex bb-grey pb-3 mb-2'>
              <div className='shorflex text-start'>
                <p className='text-large-bold'>PRODUCTS</p>
              </div>
              <div className='d-flex justify-content-between shorflex'>
                <p className='text-large-bold'>PRICE</p>
                <p className='text-large-bold'>QUANTITY</p>
                <p className='text-large-bold'>TOTAL</p>
              </div>
        </div>
        <div className='d-flex flex-column gap-3'>
            {test.map((item) => {
            const { id, name, price } = item;
            const quantity = quantities[id] || 0;
            const total = price * quantity;

            return (
            <React.Fragment key={id}>
                <div className='d-flex bb-grey pb-3'>
                <div className='d-flex shorflex gap-3'>
                    <img className='small-img' src='' alt='' />
                    <div className='d-flex flex-column gap-2 text-start justify-content-center'>
                    <div>
                        <p className='text-small m-0'>{name}</p>
                        <span>{getStar(3)}</span>
                    </div>
                    </div>
                </div>
                <div className='d-flex shorflex align-items-center justify-content-between'>
                    <p className='text-bold m-0 text-red'>{price}</p>
                    <div className='quantity-container'>
                    <button className='unset p-1' onClick={() => handleDecrement(id)}>
                        -
                    </button>
                    <p className='m-0'>{quantity}</p>
                    <button className='unset p-1' onClick={() => handleIncrement(id)}>
                        +
                    </button>
                    </div>
                    <p className='text-bold m-0 text-red'>{total}</p>
                </div>
                </div>
            </React.Fragment>
            );
        })}
        </div>
        <div className='d-flex justify-content-between'>
            <button className="button-grey">CONTINUE SHOPPING</button>
            <button className="button-grey"> UPDATE CART</button>
        </div>
        <div className='d-flex justify-content-between'>
          <div className='d-flex flex-column text-start'>
              <p className='text-large-bold'>DISCOUNT CODES</p>
              <div className='email-input-container mb-4'>
                    <input className='email-input' placeholder='Enter Coupon'></input>
                    <button className='email-sub-button'>APPLY</button>
                </div>
          </div>
          <div className='cart-total'>
              <p className='text-large-bold'>CART TOTAL</p>
              <div className='d-flex justify-content-between'>
                  <p className='text-bold'>Subtotal</p>
                  <p className='text-bold text-red'>${subtotal}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='text-bold'>Tax</p>
                <p className='text-bold text-red'>$0</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='text-bold'>Total</p>
                <p className='text-bold text-red'>${total}</p>
              </div>
              <buton className='email-sub-button wd-100'>Checkout</buton>
          </div>
        </div>
    </div>
  );
};

export default Checkout;
