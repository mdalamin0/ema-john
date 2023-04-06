import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ItemsReview from '../ItemsReview/ItemsReview';
import { removeFromDb } from '../../utilities/fakedb';
import { faArrowRight, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrderReview = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleAddToCart = (id) => {
        const remaining = cart.filter(pd => pd.id !== id);
        setCart(remaining)
        removeFromDb(id)
    }
    const removeCart = () => {
        localStorage.removeItem('shopping-cart');
        setCart([])
    }
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12 col-md-8'>
                    {
                        cart.map(product => <ItemsReview key={product.id} product={product} handleAddToCart = {handleAddToCart}></ItemsReview>)
                    }
                </div>
                <div className='col-12 col-md-4'>
                    <Cart cart={cart} removeCart = {removeCart}>
                    <button className='review-btn'>Proceed Checkout <FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon></button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default OrderReview;