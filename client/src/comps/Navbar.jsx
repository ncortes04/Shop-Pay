import React from 'react'

const Navbar = () => {
  return (
    <div className='nav-container d-flex align-items-center'>
        <div className='d-flex flex-grow-1 justify-content-between  p-4'>
            <div >Logo</div>
            <div className='d-flex gap-4'>
                <p className="text-bold">HOME</p>
                <p className="text-bold">WOMEN'S</p>
                <p className="text-bold">MEN'S</p>
                <p className="text-bold">SHOP</p>
                <p className="text-bold">PAGES</p>
                <p className="text-bold">BLOG</p>
                <p className="text-bold">CONTACT</p>
            </div>
            <div className='d-flex gap-4'>
                <div>
                    <a className='text-secondary text-decoration-none'>Login / Register</a>
                </div>
                <div>
                    <button><img></img></button>
                    <button><img></img></button>
                    <button><img></img></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar