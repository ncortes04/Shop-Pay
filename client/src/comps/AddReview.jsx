import React, { useState } from 'react';
import goldStar from '../assets/ic-actions-star-large.svg';
import blankStar from '../assets/ic-actions-star-blank-large.svg';
import { addReview } from '../utils/apiRoutes'
import { useParams } from 'react-router-dom';

const AddReview = () => {
  const [newComment, setNewComment] = useState({
    header: '',
    body: '',
  });
  const [rating, setRating] = useState(0);
  const [final, setFinal] = useState(0);
  const {id} = useParams();

  const handleCommentInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };
  const getStarReview = () => {
    const res = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating || (final > 0 && i <= final)) {
        res.push(
          <img
            key={i}
            src={goldStar}
            onMouseEnter={() => setRating(i + 1)}
            onMouseLeave={() => setRating(0)}
            onClick={(event) => handleStarClick(event, i)}
            style={{ cursor: 'pointer' }}
          />
        );
      } else {
        res.push(
          <img
            key={i}
            src={blankStar}
            onMouseEnter={() => setRating(i + 1)}
            onMouseLeave={() => setRating(0)}
            onClick={(event) => handleStarClick(event, i)}
            style={{ cursor: 'pointer' }}
          />
        );
      }
    }
    return res;
  };
  const handleStarClick = (event, index) => {
    event.preventDefault();
    setRating(index + 1);
    setFinal(index);
  };
  const handleAddComment = async () => {
    // add your code to post new comment here
    try {
        const response = await addReview(id, newComment.body, final + 1, newComment.header);
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
           throw new Error('something went wrong!');
         }
         
       } catch (err) {
         console.error(err);
       }
    setNewComment({ header: '',
    body: ''}); // clear the input field
  };

  return (
    <div className='d-flex flex-column gap-3'>
      <p className='text-medium-bold m-0'>Add a Header:</p>
        <input
            className='input-small'
            name='header'
            placeholder='Enter Your Header'
            value={newComment.header}
            onChange={handleCommentInputChange}
        />
        <p className='text-medium-bold m-0'>How Many Stars Would You Give This Item?</p>
        <div className='flex gap1'>{getStarReview()}</div>
        <textarea
            className='input-large'
            name='body'
            placeholder='Add a comment...'
            value={newComment.body}
            onChange={handleCommentInputChange}
        />
        <button className='black-button p-2' onClick={handleAddComment}>
            Submit
        </button>
    </div>
  );
};

export default AddReview;
