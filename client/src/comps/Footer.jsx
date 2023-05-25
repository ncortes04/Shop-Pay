import React from 'react'
import masterCard from '../assets/mastercard.svg'
import paypal from '../assets/paypal.svg'
import visa from '../assets/visa.svg'
import discover from '../assets/discover.svg'
import cirrus from '../assets/cirrus.svg'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
import love from '../assets/love.svg'
import youtube from '../assets/youtube.svg'
import instagram from '../assets/instagram.svg'
import pintrest from '../assets/pintrest.svg'


const Footer = () => {
  return (
    <div className='main-div'>
         <div className='d-flex mt-5'>
            <div className=" footer-payments d-flex flex-column gap-3 shorflex text-start">
                <p>Logo</p>
                <p className='text-secondary'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum perferendis quas sapiente esse, aperiam itaque, quod aspernatur veniam, quaerat quibusdam quos nihil ex temporibus molestias modi laborum culpa adipisci pariatur.</p>
                <div className='d-flex gap-2'>
                    <img src={masterCard}className="payment-icons"></img>
                    <img src={visa}className="payment-icons"></img>
                    <img src={discover}className="payment-icons"></img>
                    <img src={paypal}className="payment-icons"></img>
                    <img src={cirrus}className="payment-icons"></img>
                </div>
            </div>

            <div className="d-flex shorflex justify-content-between">
                <div className="d-flex flex-column text-start gap-2">
                    <p className='text-large-bold'>QUICK LINKS</p>
                    <p className="text-secondary m-0">About</p>
                    <p className="text-secondary m-0">Blogs</p>
                    <p className="text-secondary m-0">Contact</p>
                    <p className="text-secondary m-0">FAQ</p>
                </div>
                <div className="d-flex flex-column text-start gap-2">
                    <p className='text-large-bold'>ACCOUNT</p>
                    <p className="text-secondary m-0">My Account</p>
                    <p className="text-secondary m-0">Order Tracking</p>
                    <p className="text-secondary m-0">Checkout</p>
                    <p className="text-secondary m-0">Wishlist</p>
                </div>
                <div className="d-flex flex-column text-start gap-2">
                    <p className='text-large-bold'>NEWSLETTER</p>
                    <div className='email-input-container mb-4'>
                        <input className='email-input' placeholder='Email'></input>
                        <button className='email-sub-button'>SUBSCRIBE</button>
                    </div>
                    <div className='d-flex gap-2'>
                        <div className="link-icons">
                            <img src={facebook}></img>
                        </div>
                        <div className="link-icons">
                            <img src={twitter}></img>
                        </div>
                        <div className="link-icons">
                            <img src={youtube}></img>
                        </div>
                        <div className="link-icons">
                            <img src={instagram}></img>
                        </div>
                        <div className="link-icons">
                            <img src={pintrest}></img>
                        </div>
                </div>
                </div>
            </div>
         </div>
         <div className='closure-div'>
            <p className='m-0'>Copyright © 2023 All rights reserved | Made with <img src={love}></img>  by Nicholas Cortes</p>
         </div>
    </div>
  )
}

export default Footer