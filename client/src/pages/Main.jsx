import React from 'react'
import Header from '../comps/Header'
import Products from '../comps/Products'
import Banner from '../comps/Banner'
import Featured from '../comps/Featured'
import DiscountBanner from '../comps/DiscountBanner'
import FooterAssets from '../comps/FooterAssets'

const Main = () => {
  return (
    <div className='main-div'>
        <Header/>
        <Products/>
        <Banner/>
        <Featured/>
        <DiscountBanner/>
        <FooterAssets/>
    </div>  
    )
}

export default Main