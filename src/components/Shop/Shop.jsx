import React, { useEffect, useState } from 'react';
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
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className=' products-container col-12 col-md-8 row row-cols-1 row-cols-md-3 g-4'>
                    {
                        products.map(product => <Product product={product} key={product.id} handleAddToCart = {handleAddToCart}></Product>)
                    }
                </div>
                <div className='col-12 col-md-4 p-3' style={{backgroundColor: '#FFE0B3'}}>
                    <h4 className='text-center border-bottom border-primary pb-2'>Order summary</h4>
                    <h6 className='mt-3'>Select items: {cart.length}</h6>
                </div>
            </div>
        </div>
    );
};

export default Shop;