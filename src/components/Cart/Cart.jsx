import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    let totalPrice = 0;
    let totalShipping = 0;
    for(const product of cart) {
        totalPrice = totalPrice + product.price
        totalShipping = totalShipping + product.shipping
    }
    let tax = totalPrice * 7 / 100;
    const totalGrand = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h4 className='text-center border-bottom border-primary pb-2'>Order summary</h4>
            <h6 className='mt-3'>Select items: {cart.length}</h6>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Grand Total: ${totalGrand.toFixed(2)}</p>
        </div>
    );
};

export default Cart;