import React, {useEffect} from 'react'
import Header from '../comps/Header'
import Products from '../comps/Products'
import Banner from '../comps/Banner'
import Featured from '../comps/Featured'
import DiscountBanner from '../comps/DiscountBanner'
import FooterAssets from '../comps/FooterAssets'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../features/posts'
const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchPosts());
  }, []);
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