import React from 'react';
import './ItemsReview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ItemsReview = ({ product, handleAddToCart }) => {
    const { img, name, price, quantity, _id } = product;
    return (
        <div className='card mb-4'>
            <div className='me-5 p-2 d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <img src={img} className='product-img rounded me-4' alt="" />
                   <div>
                    <h6>{name}</h6>
                    <p className='price'>Price: <span className='text-warning'>${price}</span></p>
                    <p>Order Quantity: <span className='text-warning'>{quantity}</span></p>
                   </div>
                </div>
                <div>
                    <button onClick={() => handleAddToCart(_id)} className='btn-delete'>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ItemsReview;