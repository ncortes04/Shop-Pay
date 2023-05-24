import React from 'react'
import { importImage } from '../utils/helperFunctions'
const Showcase = () => {
    const test = [1, 2, 3, 4]
  return (
    <div className='d-flex gap-2 row'>
    {test && test.map(card => {
        return (
            <div className='product-card'>
                <img src={importImage('button-tweed-blazer')} className='card-image'></img>
                <div className='m-2'>
                    <p className='m-0'>card.name</p>
                    <span>card.rating</span>
                </div>
                <p>card.price</p>
            </div>
        )
    })}

</div>
  )
}

export default Showcase