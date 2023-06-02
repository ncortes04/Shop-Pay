import React, {useState, useEffect} from 'react'
import { importImage,getStar } from '../utils/helperFunctions'
import { getbyCategory } from '../utils/apiRoutes'
import { Navigate, useNavigate } from 'react-router-dom'
const Showcase = ({category}) => {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const navigate = useNavigate()
    var handlePageRelocate = function(itemId, index) {
        navigate(`/single/${itemId}`);
    }    
    const getItems = async () => {
        setLoading(true);
        try {
            const response = await getbyCategory(category);
            const data = await response.json();

            setItems(data);
        } catch (e) {
            console.log(e);
        }
    
        setLoading(false);
    };
    
    useEffect(() => {
        getItems();
    }, [category])  
return (
    <div className='d-flex gap-2 row'>
    {loading ? (
        <div>loading...</div>
    ) : (
        <>
            {items.map((card, index) => {
                return (
                    <div className='product-card pointer'
                    onClick={() => {handlePageRelocate(card._id, index)}}
                    >
                        <img src={importImage(card.name)} className='card-image'></img>
                        <div className='m-2'>
                            <p className='m-0'>{card.name}</p>
                            <span>{getStar(card.averageRating)}</span>
                        </div>
                        <p>{card.price}</p>
                    </div>
                )
            })}
        </>
    )}


</div>
  )
}

export default Showcase