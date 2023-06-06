import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getStar } from '../utils/helperFunctions'
import likedBlank from '../assets/liked-blank.svg'
import { getIndividual } from '../utils/apiRoutes'
import clipboard from '../assets/clipboard.svg'
import Review from '../comps/Reviews'
import Showcase from '../comps/Showcase'
import { importImage } from '../utils/helperFunctions';

const Single = () => {
const [loading, setLoading] = useState(true)
const [singleItem, setsingleItem] = useState({});
const [variations, setVariations] = useState(new Map());
const [activeButton, setActiveButton] = useState('description');
const [ selectedColor , setSelectedColor]= useState(null);
const [selectedSize, setSelectedSize] = useState(null);
const [quantity, setQuantity] = useState(1);
const { id } = useParams();
const getItems = async () => {
    setLoading(true);
    try {
        const response = await getIndividual(id);
        const data = await response.json();

        for (const item of data.variations) {
        const { color, size } = item;
        if (!variations.has(color.code)) {
            setVariations((prevVariations) => new Map(prevVariations.set(color.code, [size.name])));
        } else {
            setVariations((prevVariations) => {
            const sizes = prevVariations.get(color.code);

            if (!sizes.includes(size.name)) {
                sizes.push(size.name);
            }

            return new Map(prevVariations.set(color.code, sizes));
            });
        }
        }

        setsingleItem(data);
    } catch (e) {
        console.log(e);
    }

    setLoading(false);
};

    useEffect(() => {
        getItems();
    }, [id]);


    const handleButtonClick = (value) => {
        setActiveButton(value);
    };
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];
    
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };
    const handleDecrement = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1);
    }
    };

    const handleIncrement = () => {
    setQuantity(quantity + 1);
    };
    const handleAddToCart = () => {
        if(!selectedColor || !selectedSize){
            return
        }
        const cartItem = {
          _id: singleItem._id,
          rating: singleItem.averageRating,
          name: singleItem.name,
          price: singleItem.price,
          selectedColor,
          selectedSize,
          quantity,
        };
    
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
        existingCartItems.push(cartItem);
    
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    
        setSelectedColor(null);
        setSelectedSize(null);
        setQuantity(1);
      };
  return (
    <div className='main-div '>
         {loading ? (
        <p>Loading...</p>
        ) : (
            <>
                    <div className='single-image-container d-flex gap-3'>
            <div style={{overflow:'hidden'}} className='d-flex gap-3 align-items-center'>
                <div className='d-flex flex-column gap-3 '>
                    <img src="" alt="" className="secondary-single-img" />
                    <img src="" alt="" className="secondary-single-img" />
                    <img src="" alt="" className="secondary-single-img" />
                    <img src="" alt="" className="secondary-single-img" />
                </div>
                <img src={importImage(singleItem.name)}  alt='' className='single-image'></img>
            </div>
            <div className='d-flex shorflex flex-column align-items-start gap-3'>
                <div className='d-flex flex-column text-start'>
                    <h2 className='header-small-bold m-0'>{singleItem.name}</h2>
                    <p className='text-secondary m-0'>{singleItem.brand}</p>
                </div>
                <div className='d-flex align-items-center justify-content-center gap-2'>
                    <span>
                        {getStar(singleItem.averageRating)} 
                    </span>
                    <p className='text-secondary m-0'>{singleItem.ratingCount}</p>
                </div>
                <p className='header-small-bold text-red'>$100.00</p>
                <div className='text-start'>
                <p className='text-normal'>{singleItem.description}</p>
                </div>
                <div className='d-flex bb-grey wd-100 gap-4 pb-4'>
                    <p className="text-medium-bold m-0 align-self-center ">Quantity:</p>
                    <div className="quantity-container">
                        <button  className='unset' onClick={handleDecrement}>-</button>
                        <p className='m-0'>{quantity}</p>
                        <button className='unset' onClick={handleIncrement}>+</button>
                    </div>
                    <buton 
                    onClick={() => handleAddToCart()}
                    className='add-cart-btn '
                    disabled={!selectedColor || !selectedSize}
                    >
                        <img src={clipboard}></img>
                        ADD TO CART
                    </buton>
                    <buton className='icon'><img src={likedBlank}></img></buton>
                </div>
                <div className='pt-3 d-flex gap-3'>
                    <div className='d-flex flex-column text-start gap-3'>
                         <p className='text-medium-bold m-0'>Availabillity:</p>
                         <p className='text-medium-bold m-0'>Available Sizes:</p>
                         <p className='text-medium-bold m-0'>Available Colors:</p>
                         <p className='text-medium-bold m-0'>Promotions:</p>
                    </div>
                    <div className='d-flex flex-column text-start gap-3'>    
                         <p className='text-secondary m-0'>{singleItem.variations ? "In Stock" : "Out of Stock"}</p>
                         <div className="size-buttons">
                            {sizes.map((size, index) => {
                                const isAvailable = variations.get(selectedColor)?.includes(size);
                                const className = `${selectedSize === size ? 'size-button-selected' : 'size-button'} ${isAvailable ? '' : 'unavailable'}`;

                                return (
                                <button
                                    key={index}
                                    className={className}
                                    onClick={() => handleSizeSelect(size)}
                                    disabled={!isAvailable}
                                >
                                    {size}
                                </button>
                                );
                            })}
                            </div>
                            <div className="d-flex gap-2  align-items-center">
                                {Array.from(variations.keys()).map((color, index) => {
                                    return(
                                        <button
                                        key={index}
                                        className={selectedColor == color ? "color-button-selected" : "color-button"}
                                        style={{ backgroundColor: color }}
                                        onClick={() => {setSelectedColor(color) 
                                                        setSelectedSize(null)}}
                                    >
                                    </button>
                                    )
                                })}
                         </div>   
                        <p className='text-secondary'>item.promo</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='single-options-line'>
            <span className='option-line'></span>
            <div className='d-flex gap-3 p-3'>
                <button
                    className={`unset text-large-bold ${activeButton === 'description' ? 'spec-active' : 'spec-inactive'}`}
                    onClick={() => handleButtonClick('description')}
                >
                    description
                </button>
                <button
                    className={`unset text-large-bold ${activeButton === 'specifications' ? 'spec-active' : 'spec-inactive'}`}
                    onClick={() => handleButtonClick('specifications')}
                >
                    Specifications
                </button>
                <button
                    className={`unset text-large-bold text-nowrap ${activeButton === 'reviews' ? 'spec-active' : 'spec-inactive'}`}
                    onClick={() => handleButtonClick('reviews')}
                >
                    Reviews (1)
                </button>
            </div>
            <span className='option-line'></span>
        </div>
        {activeButton === 'description'
        ? <div className='f-flex flex-column text-start gap-4'>
            <p className='text-bold'>Description</p>
            <p className='text-normal text-grey'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam cupiditate officiis odit debitis molestiae natus pariatur omnis repellendus eos enim explicabo est doloribus maiores voluptatem ducimus, doloremque, perferendis vitae placeat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore accusamus optio ullam porro pariatur, molestiae aliquid placeat nam recusandae error culpa repellendus ratione laborum reiciendis eum veniam sequi a id? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptate praesentium facere perspiciatis, recusandae perferendis eos repellat nisi veniam in repudiandae voluptatem odit? Esse voluptatum rerum soluta quo, velit laborum.</p>
         </div>
        : activeButton === 'specifications' ? 
            <div></div>
        : <Review reviews={singleItem.reviews}/>}
        <div>
            <h3 className='text-large-bold m-4'>RELATED PRODUCTS</h3>
            <Showcase category={singleItem.category._id}/>
        </div>
        </>
        )}

    </div>
  )
}

export default Single