import React, { useState, useEffect } from 'react';
import { getStar, importImage } from '../utils/helperFunctions';

const Checkout = () => {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isCartUpdated, setIsCartUpdated] = useState(false); // New state variable

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem('cartItems');
    if (cartItemsFromStorage) {
      const parsedCartItems = JSON.parse(cartItemsFromStorage);
      const updatedQuantities = parsedCartItems.reduce((acc, item) => {
        acc[item._id] = item.quantity;
        return acc;
      }, {});
      setQuantities(updatedQuantities);
      setCartItems(parsedCartItems);
    }
  }, []);

  useEffect(() => {
    const calculatedSubtotal = cartItems.reduce((acc, item) => {
      const { _id, price } = item;
      const quantity = quantities[_id] || 0;
      return acc + price * quantity;
    }, 0);
    setSubtotal(calculatedSubtotal);

    // Replace with your tax calculation logic
    const calculatedTax = 0;
    setTax(calculatedTax);

    const calculatedTotal = calculatedSubtotal + calculatedTax;
    setTotal(calculatedTotal);
  }, [cartItems, quantities]);

  const handleDecrement = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item._id === itemId) {
          const updatedQuantity = Math.max(item.quantity - 1, 0);
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );
  };

  const handleIncrement = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item._id === itemId) {
          const updatedQuantity = item.quantity + 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );
  };

  const handleUpdateCart = () => {
    setIsCartUpdated(!isCartUpdated);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== itemId));
  };

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
        {cartItems.map((item) => {
          const { _id, name, price, quantity } = item;
          const itemTotal = price * quantity;
          return (
            <React.Fragment key={_id}>
              <div className='d-flex bb-grey pb-3'>
                <div className='d-flex shorflex gap-3'>
                  <img className='small-img' src={importImage(name)} alt='' />
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
                    <button className='unset p-1' onClick={() => handleDecrement(_id)}>
                      -
                    </button>
                    <p className='m-0'>{quantity}</p>
                    <button className='unset p-1' onClick={() => handleIncrement(_id)}>
                      +
                    </button>
                  </div>
                  <p className='text-bold m-0 text-red'>{itemTotal}</p>
                  {isCartUpdated && ( // Render the "Remove" button conditionally
                    <button className='unset p-1' onClick={() => handleRemoveItem(_id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className='d-flex justify-content-between'>
        <a href="/" className='button-grey text-decoration-none text-black'>CONTINUE SHOPPING</a>
        <button className='button-grey' onClick={handleUpdateCart}>
          UPDATE CART
        </button>
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
            <p className='text-bold text-red'>${tax}</p>
          </div>
          <div className='d-flex justify-content-between'>
            <p className='text-bold'>Total</p>
            <p className='text-bold text-red'>${total}</p>
          </div>
          <button className='email-sub-button wd-100'>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
