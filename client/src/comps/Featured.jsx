import React from 'react'
import { getStar } from '../utils/helperFunctions'
import { useSelector } from 'react-redux'
import { importImage } from '../utils/helperFunctions'
const Featured = () => {
const Featured = useSelector((state) => state.analytics)
console.log(Featured)
return (
    <div className='d-flex justify-content-around pt-5'>
        <div className="d-flex flex-column align-start gap-4">
            <p className='text-large-bold bb-red fit-content'>HOT TREND</p>
            {Featured && Featured.hotTrendingItems.map(item => {
                return (
                    <div className="d-flex gap-3">
                        <img className='small-img' src={importImage(item.name)}></img>
                        <div className='d-flex flex-column gap-2 text-start'>
                            <div>
                            <p className='text-small m-0'>{item.name}</p>
                                <span>{getStar(item.averageRating)}</span>
                            </div>
                            <p className='text-large-bold'>{item.price}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="d-flex flex-column align-start gap-4">
            <p className='text-large-bold bb-red fit-content'>BEST SELLERS</p>
        {Featured && Featured.bestSellingItems.map(item => {
                return (
                    <div className="d-flex gap-3">
                        <img className='small-img' src={importImage(item.name)}></img>
                        <div className='d-flex flex-column gap-2 text-start'>
                        <div>
                            <p className='text-small m-0'>{item.name}</p>
                                <span>{getStar(item.averageRating)}</span>
                            </div>
                            <p className='text-large-bold'>{item.price}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="d-flex flex-column align-start gap-4">
            <p className='text-large-bold bb-red fit-content'>FEATURED</p>
            {Featured && Featured.featuredItems.map(item => {
                return (
                    <div className="d-flex gap-3">
                          <img className='small-img' src={importImage(item.name)}></img>
                        <div className='d-flex flex-column gap-2 text-start'>
                            <div>
                            <p className='text-small m-0'>{item.name}</p>
                                <span>{getStar(item.averageRating)}</span>
                            </div>
                            <p className='text-large-bold'>{item.price}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
)
}

export default Featured