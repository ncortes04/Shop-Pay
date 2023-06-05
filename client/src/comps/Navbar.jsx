import React from 'react'

const Navbar = () => {
  return (
    <div className='nav-container d-flex align-items-center'>
        <div className='d-flex flex-grow-1 justify-content-between align-items-center p-4'>
            <div >Logo</div>
            <div className='d-flex gap-4 align-items-center'>
                <p className="text-bold m-0">HOME</p>
                <p className="text-bold m-0">WOMEN'S</p>
                <p className="text-bold m-0">MEN'S</p>
                <p className="text-bold m-0">SHOP</p>
                <p className="text-bold m-0">PAGES</p>
                <p className="text-bold m-0">BLOG</p>
                <p className="text-bold m-0">CONTACT</p>
            </div>
            <div className='d-flex gap-4'>
                <div>
                    <a href="/register" className='text-secondary text-decoration-none'>Login / Register</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar