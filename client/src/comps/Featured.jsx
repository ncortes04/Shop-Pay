import React from 'react'
import { getStar } from '../utils/helperFunctions'
 const test = [1 , 2, 3]
const Featured = () => {
  return (
    <div className='d-flex justify-content-around pt-5'>
        <div className="d-flex flex-column align-start gap-4">
            <p className='text-large-bold bb-red fit-content'>HOT TREND</p>
            {test && test.map(item => {
                return (
                    <div className="d-flex gap-3">
                        <img className='small-img'></img>
                        <div className='d-flex flex-column gap-2 text-start'>
                            <div>
                                <p className='text-small m-0'>CARD.NAME</p>
                                <span>{getStar(3)}</span>
                            </div>
                            <p className='text-large-bold'>$90</p>
                        </div>
                   </div>
                )
            })}
        </div>
        <div className="d-flex flex-column align-start gap-4">
            <p className='text-large-bold bb-red fit-content'>BEST SELLERS</p>
         {test && test.map(item => {
                return (
                    <div className="d-flex gap-3">
                        <img className='small-img'></img>
                        <div className='d-flex flex-column gap-2 text-start'>
                            <div>
                            <p className='text-small m-0'>CARD.NAME</p>
                                <span>{getStar(3)}</span>
                            </div>
                            <p className='text-large-bold'>$90</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="d-flex flex-column align-start gap-4">
            <p className='text-large-bold bb-red fit-content'>FEATURED</p>
            {test && test.map(item => {
                return (
                    <div className="d-flex gap-3">
                        <img className='small-img'></img>
                        <div className='d-flex flex-column gap-2 text-start'>
                            <div>
                            <p className='text-small m-0'>CARD.NAME</p>
                                <span>{getStar(3)}</span>
                            </div>
                            <p className='text-large-bold'>$90</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Featured