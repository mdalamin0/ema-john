import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'

const Cart = ({cart, removeCart, children}) => {
    // const removeCart = props.removeCart
    // const cart = props.cart;
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart) {
        product.quantity = product.quantity || 1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    let tax = totalPrice * 7 / 100;
    const totalGrand = totalPrice + totalShipping + tax;
    
    return (
        <div className='cart'>
            <h4 className='text-center border-bottom border-primary pb-2'>Order summary</h4>
            <h6 className='mt-3'>Select items: {quantity}</h6>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Grand Total: ${totalGrand.toFixed(2)}</p>
            <button onClick={removeCart} className='clear-btn'>Clear Cart <FontAwesomeIcon icon={faTrash} /></button>
            {children}
        </div>
    );
};

export default Cart;