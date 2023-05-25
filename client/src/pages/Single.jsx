import React, {useState} from 'react'
import { getStar } from '../utils/helperFunctions'
import likedBlank from '../assets/liked-blank.svg'
import clipboard from '../assets/clipboard.svg'
import Review from '../comps/Reviews'
import Showcase from '../comps/Showcase'
const Single = () => {
    const [quantity, setQuantity] = useState(0);
    const colors = [
        {name: 'red', value: '#CA1515'}, 
        {name: 'blue', value: '#3f29f7'},
        {name: 'brown', value:'#E4AA8B'},
        {name: 'black', value:'#111111'},
      ];
      const [activeButton, setActiveButton] = useState('description');

      const handleButtonClick = (value) => {
        setActiveButton(value);
      };
      const sizes = ['XS', 'S', 'M', 'L', 'XL'];
      const [selectedSize, setSelectedSize] = useState('');
    
      const handleSizeSelect = (size) => {
        setSelectedSize(size);
      };
    const handleDecrement = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    };
  
    const handleIncrement = () => {
      setQuantity(quantity + 1);
    };
  return (
    <div className='main-div '>
        <div className='single-image-container d-flex gap-3'>
            <div style={{overflow:'hidden'}} className='d-flex gap-3 align-items-center'>
                <div className='d-flex flex-column gap-3 '>
                    <img src="" alt="" className="secondary-single-img" />
                    <img src="" alt="" className="secondary-single-img" />
                    <img src="" alt="" className="secondary-single-img" />
                    <img src="" alt="" className="secondary-single-img" />
                </div>
                <img src=''  alt='' className='single-image'></img>
            </div>
            <div className='d-flex shorflex flex-column align-items-start gap-3'>
                <div className='d-flex flex-column text-start'>
                    <h2 className='header-small-bold m-0'>CARD.NAME</h2>
                    <p className='text-secondary m-0'> CARD.BRAND</p>
                </div>
                <div className='d-flex align-items-center justify-content-center gap-2'>
                    <span>
                        {getStar(4)} 
                    </span>
                    <p className='text-secondary m-0'>(review.count)</p>
                </div>
                <p className='header-small-bold text-red'>$100.00</p>
                <div className='text-start'>
                <p className='text-normal'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur beatae deserunt corporis numquam, quis blanditiis nesciunt quisquam maxime, nobis dolores sequi ipsum iusto veniam pariatur in nihil sunt distinctio totam.</p>
                </div>
                <div className='d-flex bb-grey wd-100 gap-4 pb-4'>
                    <p className="text-medium-bold m-0 align-self-center ">Quantity:</p>
                    <div className="quantity-container">
                        <button  className='unset' onClick={handleDecrement}>-</button>
                        <p className='m-0'>{quantity}</p>
                        <button className='unset' onClick={handleIncrement}>+</button>
                    </div>
                    <buton className='add-cart-btn'><img src={clipboard}></img>ADD TO CART</buton>
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
                        <div className="d-flex gap-2">
                                {colors.map((color, index) => (
                                <button
                                    key={index}
                                    className="color-button"
                                    style={{ backgroundColor: color.value }}
                                >
                                </button>
                                ))}
                         </div>       
                         <p className='text-secondary m-0'>In Stock</p>
                         <div className="size-buttons">
                            {sizes.map((size, index) => (
                            <button
                                key={index}
                                className={`size-button ${selectedSize === size ? 'text-red' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </button>
                            ))}
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
        : <Review/>}
        <div>
            <h3 className='text-large-bold m-4'>RELATED PRODUCTS</h3>
            <Showcase/>
        </div>
    </div>
  )
}

export default Single