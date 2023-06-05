import React, {useEffect} from 'react'
import Header from '../comps/Header'
import Products from '../comps/Products'
import Banner from '../comps/Banner'
import Featured from '../comps/Featured'
import DiscountBanner from '../comps/DiscountBanner'
import FooterAssets from '../comps/FooterAssets'
import { useDispatch } from 'react-redux'
import { fetchPosts } from '../features/posts'
import { fetchAnalyticsData } from '../features/analytics'
import { useSelector } from 'react-redux'
import { fetchUser } from '../features/user'
const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchPosts());
      dispatch(fetchUser())
      dispatch(fetchAnalyticsData())
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