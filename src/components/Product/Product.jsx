import React from 'react';

const Product = (props) => {
    const {img, name, price, ratings, seller} = props.product
    return (
        <div className="col">
        <div className="card h-100">
          <img src= {img} className="card-img-top p-3" alt="..."/>
          <div className="card-body">
            <h6 className="card-title mb-4 ">{name}</h6>
            <p className="mb-0">Price: ${price}</p>
            <p className='mb-0'>Rating: {ratings} start</p>
            <p className='mb-0'>Manufacturer: {seller}</p>
          </div>
          <button className='rounded-0' style={{backgroundColor: '#FFE0B3'}}>Add to Cart 
          <i className="fa-solid fa-cart-plus ms-2"></i></button>
        </div>
      </div>
    );
};

export default Product;