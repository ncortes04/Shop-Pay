import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getStar } from '../utils/helperFunctions';
import { importImage } from '../utils/helperFunctions';
const Products = () => {

const navigate = useNavigate()
const [activeButton, setActiveButton] = useState('');

const handleClick = (button) => {
    setActiveButton(button);
};
var handlePageRelocate = function(itemId, index) {
    navigate(`/single/${itemId}`);
}

const posts = useSelector((state) => state.posts.unfilteredData);
return (
    <div className='p-5'>
        <div className='d-flex shorflex'>
            <div style={{width: '100%'}}className='d-flex justify-content-between '>
                <h3 className='bb-red'>NEW PRODUCTS</h3>
                <div className='d-flex gap-4'>
                    <button
                        className={`unset text-bold ${activeButton === 'all' ? 'active' : ''}`}
                        onClick={() => handleClick('all')}
                    >
                        ALL
                    </button>
                    <button
                        className={`unset text-bold ${activeButton === 'women' ? 'active' : ''}`}
                        onClick={() => handleClick('women')}
                    >
                        WOMEN
                    </button>
                    <button
                        className={`unset text-bold ${activeButton === 'mens' ? 'active' : ''}`}
                        onClick={() => handleClick('mens')}
                    >
                        MEN'S
                    </button>
                    <button
                        className={`unset text-bold ${activeButton === 'kids' ? 'active' : ''}`}
                        onClick={() => handleClick('kids')}
                    >
                        KID'S
                    </button>
                    <button
                        className={`unset text-bold ${activeButton === 'accessories' ? 'active' : ''}`}
                        onClick={() => handleClick('accessories')}
                    >
                        ACCESSORIES
                    </button>
                    <button
                        className={`unset text-bold ${activeButton === 'cosmetics' ? 'active' : ''}`}
                        onClick={() => handleClick('cosmetics')}
                    >
                        COSMETICS
                    </button>
                </div>
            </div> 
        </div>
        <div className='d-flex gap-2 row'>
            {posts && posts.map((card, index) => {
                return (
                    <div 
                    onClick={() => {handlePageRelocate(card._id, index)}}
                    className='product-card pointer'>
                        <img src={importImage(card.name)} className='card-image'></img>
                        <div className='m-2'>
                            <p className='m-0'>{card.name}</p>
                            <span>{getStar(card.averageRating)}</span>
                        </div>
                        <p>{card.price}</p>
                    </div>
                )
            })}

        </div>


    </div>
)
}

export default Products