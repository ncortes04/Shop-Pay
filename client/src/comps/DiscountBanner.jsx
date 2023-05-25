import React from 'react'
import discount from '../assets/discount.svg'

const DiscountBanner = () => {
  return (
    <div className='d-flex pt-5'>
        <div>
            <img src={discount}></img>
        </div>
        <div style={{backgroundColor: '#f4f4f4'}}className="shorflex d-flex">
            <div  style={{marginTop: '100px'}} className='shorflex d-flex flex-column gap-5 align-items-center'>
                <div className='circle-text'>
                    <p className='text-bold m-0' >DISCOUNT</p>
                    <h3 style={{ color: '#7064FF'}}className='header-bold m-0'>Summer2023</h3>
                    <p className='text-bold m-0' >sale: <span style={{ color: '#7064FF', fontSize:'20px'}} className='text-bold m-0'> 50%</span></p>
                    <div className='circle'></div>
                </div>
                <a className='text-bold text-decoration-none bb-red fit-content'>Shop Now</a>
            </div>
        </div>
    </div>
  )
}

export default DiscountBanner