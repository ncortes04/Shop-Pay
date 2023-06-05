import React from 'react'
import watch from '../assets/smart-watch.svg'
import chair from '../assets/chair.svg'
import drone from '../assets/drone.png'
const Header = () => {
  return (
    <div style={{height: "650px"}} className='h-200 d-flex gap-2'>
        <div style={{maxWidth: "50%"}} className=' d-flex gap-5 shorflex header-light-pink'>
            <div style={{width: "300px"}} className=' shorflex1 d-flex align-items-center' >
                <img src={watch}></img>
            </div>
            <div style={{maxWidth: "50%"}}  className='d-flex align-self-center flex-column text-start'>
                <div>
                    <h3 className='header-bold m-0'>Smart Watch</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt odio sit beatae ab earum repudiandae asperiores cupiditate deleniti incidunt voluptatum ipsum, officiis quisquam accusantium dignissimos sed velit. Facere, nemo rem.</p>
                    <a className='text-bold text-decoration-none bb-red'>Shop Now</a>
                </div>
            </div>
        </div>
        <div  style={{maxWidth: "50%"}} className='d-flex gap-2 shorflex flex-column'>
           <div className='d-flex shorflex gap-2'>
                <div className="shorflex header-green d-flex justify-content-start align-items-center">
                    <div className='d-flex flex-column text-start p-4'>
                        <h3 className='header-bold m-0'>Men's Fashion</h3>
                        <p>450 items</p>
                        <div>
                        <a className='text-bold text-decoration-none bb-red'>Shop Now</a>
                        </div>
                    </div>
                </div>
                <div className="shorflex header-purple d-flex justify-content-start align-items-center">
                    <div className='d-flex flex-column text-start p-4'>
                        <h3 className='header-bold m-0'>Kid's Fashion</h3>
                        <p>450 items</p>
                        <div>
                        <a className='text-bold text-decoration-none bb-red'>Shop Now</a>
                        </div>
                    </div>
                </div>
           </div>
            <div className='d-flex gap-2 shorflex'>
            <div className="shorflex header-pink d-flex justify-content-start align-items-center rel">
                    <div className='d-flex flex-column text-start p-4'>
                        <h3 className='header-bold m-0 z-1'>Cantilever chair's</h3>
                            <p>450 items</p>
                        <div>
                            <a className='text-bold text-decoration-none bb-red'>Shop Now</a>
                        </div>
                        <img  className='header-second-img' src={chair}></img>
                    </div>
                </div>
                <div className="shorflex header-blue d-flex justify-content-start align-items-center rel">
                    <div className='d-flex flex-column text-start p-4'>
                        <h3 className='header-bold m-0 z-1'>Accesories</h3>
                        <p>450 items</p>
                        <div>
                        <a className='text-bold text-decoration-none bb-red'>Shop Now</a>
                        </div>
                        
                        <img  className='header-second-img' src={drone}></img>
                    </div>
                </div>           
            </div>
        </div>
    </div>
  )
}

export default Header