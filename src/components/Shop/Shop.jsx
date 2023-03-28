import React, { useEffect, useState } from 'react';
import { addToDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        addToDb(product.id)
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className=' products-container  col-8 row row-cols-1 row-cols-md-3 g-4'>
                    {
                        products.map(product => <Product product={product} key={product.id} handleAddToCart = {handleAddToCart}></Product>)
                    }
                </div>
                <div className=' col-4 cart-container'>
                    <Cart cart = {cart} ></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;