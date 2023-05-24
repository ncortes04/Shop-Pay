import React from 'react'
import dollar from '../assets/footer-dollar.svg'
import coin from '../assets/footer-coin.svg'
import headset from '../assets/footer-headset.svg'
import car from '../assets/footer-car.svg'

const FooterAssets = () => {
  return (
    <div className='d-flex justify-content-between pt-5'>
        <div className='d-flex gap-3 justify-content-center'>
            <img src={car}></img>
            <div className='d-flex flex-column align-items-center'>
                <p className='text-bold m-0'>Free Shipping</p>
                <p className='text-secondary m-0'>For all orders over 50$</p>
            </div>
        </div>
        <div className='d-flex gap-3 justify-content-center'>
            <img src={dollar}></img>
            <div className='d-flex flex-column align-items-center'>
                <p className='text-bold m-0'>money Back Guarantee</p>
                <p className='text-secondary m-0'>If your shipments aren't correct</p>
            </div>
        </div>
        <div className='d-flex gap-3 justify-content-center'>
            <img src={headset}></img>
            <div className='d-flex flex-column align-items-center'>
                <p className='text-bold m-0'>24/7 Online Support</p>
                <p className='text-secondary m-0'>Dedicated Support</p>
            </div>
        </div>
        <div className='d-flex gap-3 justify-content-center'>
            <img src={coin}></img>
            <div className='d-flex flex-column align-items-center'>
                <p className='text-bold m-0'>Secure Payment</p>
                <p className='text-secondary m-0'>You data is safe and secure</p>
            </div>
        </div>
    </div>
  )
}

export default FooterAssets