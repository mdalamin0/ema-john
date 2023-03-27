import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className='container'>
            <div className='row'>
                <div className=' products-container col-12 col-md-8 row row-cols-1 row-cols-md-3 g-4'>
                    {
                        products.map(product => <Product product={product} key={product.id}></Product>)
                    }
                </div>
                <div className='col-12 col-md-4 p-3' style={{backgroundColor: '#FFE0B3'}}>
                    <h3 className='text-center'>Order summary</h3>
                </div>
            </div>
        </div>
    );
};

export default Shop;