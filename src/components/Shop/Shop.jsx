import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { faArrowRight, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    let savedCart = [];
    useEffect(() => {
        const storedCart = getShoppingCart()
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart)
    }, [products])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        addToDb(product.id)
    }
    const removeCart = () => {
        localStorage.removeItem('shopping-cart')
        setCart(savedCart)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className=' products-container col-8 row row-cols-1 row-cols-lg-3 g-4'>
                    {
                        products.map(product => <Product product={product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>
                <div className=' col-4 cart-container'>
                    <Cart cart={cart} removeCart={removeCart}>
                        <Link to = '/orders'><button className='review-btn'>Review Order <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;