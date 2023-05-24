import React, {useState} from 'react'
// import { addReview } from "../utils/apiRoutes"
import goldStar from'../assets/ic-actions-star.svg'
import blankStar from'../assets/ic-actions-star-blank.svg'
const Review = ({setShowCommentInput, id}) => {  
    const [rating, setRating] = useState(0);
    const [final, setFinal] = useState(0)
    const [newComment, setNewComment] = useState({
        header: '',
        body: ''
      });
      const handleCommentInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prevComment => ({
          ...prevComment,
          [name]: value
        }));
      };
    //   const handleAddComment = async () => {
    //     // add your code to post new comment here
    //     try {
    //         const response = await addReview(id, newComment.body, final + 1, newComment.header);
    //         const data = await response.json()
    //         console.log(data)
    //         if (!response.ok) {
    //            throw new Error('something went wrong!');
    //          }
             
    //        } catch (err) {
    //          console.error(err);
    //        }
    //     setShowCommentInput(false)
    //     setNewComment({ header: '',
    //     body: ''}); // clear the input field
    //   };
    

      const handleStarClick = (event, index) => {
        event.preventDefault();
        setRating(index + 1);
        setFinal(index)
      };
    
      const getStarReview = () => {
        const res = [];
        for (let i = 0; i < 5; i++) {
          if (i < rating || final > 0 && i <= final ) {
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
  return (

    <div className='flex col shorflex1 gap2 bg-grey pd2 br1'>
            <p className='text-bold mg0'>Title</p>
                 <input
                className='input-small'
                name='header'
                placeholder='Enter Your Title'
                value={newComment.header}
                onChange={handleCommentInputChange}
                />
            <p className='text-bold mg0'>How Many Stars Would You Give This Vehicle?</p>
            <div className='flex gap1'>
                {getStarReview()}
            </div>
                <textarea
                className='input-large'
                name='body'
                placeholder='Add a comment...'
                value={newComment.body}
                onChange={handleCommentInputChange}
                />
            {/* <button className='review-submit-btn' onClick={handleAddComment}>Submit</button> */}
        </div>
  )
}

export default Review