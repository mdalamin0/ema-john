import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { faArrowRight, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const { totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const pageNumbers = [...Array(totalPages).keys()];
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')

    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data);
        };

        fetchData();
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        const storedCart = getShoppingCart()
        const ids = Object.keys(storedCart);


        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                let savedCart = [];
                for (const id in storedCart) {
                    const addedProduct = cartProducts.find(product => product._id === id)
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct)
                    }
                }
                setCart(savedCart)
            })
    }, [])


    const handleAddToCart = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)
        addToDb(product._id)
    }
    const removeCart = () => {
        localStorage.removeItem('shopping-cart')
        setCart(savedCart)
    }

    const options = [5, 10, 20]
    function handleSelectChange(event) {
        setItemsPerPage(event.target.value);
        setCurrentPage(0)
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className=' products-container col-8 row row-cols-1 row-cols-lg-3 g-4'>
                        {
                            products.map(product => <Product product={product} key={product._id} handleAddToCart={handleAddToCart}></Product>)
                        }
                    </div>
                    <div className=' col-4 cart-container'>
                        <Cart cart={cart} removeCart={removeCart}>
                            <Link to='/orders'><button className='review-btn'>Review Order <FontAwesomeIcon icon={faArrowRight} /></button></Link>
                        </Cart>
                    </div>
                </div>
            </div>
            <div className='text-center my-5 '>
                {
                    pageNumbers.map(number => <button
                        className={currentPage === number ? 'selected' : ''}
                        key={number}
                        onClick={() => setCurrentPage(number)}
                    >{number}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;