import React from 'react';

/**
 * ProductoComponent 
 * @returns card data of product 
 */

export default function ProductComponet(props) {
    /** Product */
    const { product } = props;

    /**
     * 
     * @param {Array} tags
     * transform array of string whit comma 
     * @returns {Element}
     */
    const tagsElement = (tags) => {
        return <span className='tag'>{tags.join(', ')}</span>
    }

    return (
        <div className='card-search'>
            <div className='body-header'>
                <img src={product.picture} className='picture'></img>
            </div>
            <div className='body-content'>
                <div className='title'>{product.name}</div>
                <div className='description'>{product.about}</div>
            </div>
            <div className='footer-content'>
                <div className='tags'><strong>Tags: </strong>{tagsElement(product.tags)}</div>
                <div className='prices'>${product.price}</div>
            </div>
        </div>
    )
}
