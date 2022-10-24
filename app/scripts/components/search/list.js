import React from 'react';
import ProductComponet from './product';

/**
 * ListComponent 
 * return List products  
 */
export default function ListComponent(props) {
    /** props for manage list products */
    const { products, metaPagination } = props;

    return (
        <>
            {products.length > 0 ?
                <div className='list-serch'>
                    <div className='total-result'>
                        <p> Displaying {metaPagination.displaying} of {metaPagination.total} elements</p>
                    </div>
                    <div className="container">
                        {products.map((product, i) =>
                            <ProductComponet product={product} key={i}></ProductComponet>
                        )}
                    </div>
                </div>
                : <p>No results found</p>}
        </>
    )
}
